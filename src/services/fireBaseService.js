/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-continue */
import _ from 'lodash';
import moment from 'moment-timezone';
import i18n from 'i18n';
import logger from '../logger';
// import notificationService from '../packages/notification/service.js';
import customerRepo from '../packages/customer/repository.js';
import cleanerService from '../packages/cleaner/service';
import commonConfig from '../packages/common/config';
import custConfig from '../packages/customer/config';
import cleanConfig from '../packages/cleaner/config';
// import validateUtil from '../utils/validation';
import env from '../utils/env';
import { apnProvider, apn } from '../moduls/push-apn/index.js';

const timezone = 'Asia/Dubai';
const checkHour = 6;
const firebase = require('firebase-admin');
const serviceAccount = env.isProduction()
  ? require('./firebase-adminsdk.json')
  : require('./firebase-dev-adminsdk.json');

// const fireBaseUrl = env.FIREBASE_URL;

const MAX_USERS_PUSH = 1000;
const PUSHING_TIME_INTERVAL = 1000;

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

function localeMessage(msg, arg = null, locale = commonConfig.baseLanguage) {
  try {
    if (arg) {
      return i18n.__(
        {
          phrase: msg,
          locale,
        },
        arg
      );
    }
    return i18n.__({
      phrase: msg,
      locale,
    });
  } catch (error) {
    logger.error('Error translate language', { msg, arg, locale, error });
    console.log(`Error translate language: ${error}`);
    return `${msg} ${arg}`;
  }
}

const getCleanerDeviceToken = async (cleanId) => {
  const logDevices = await cleanerService.findLogDevice({
    cleaner_id: cleanId,
  });
  if (!logDevices || logDevices.length === 0) {
    return Promise.resolve([]);
  }

  const rs = logDevices
    .map((m) => {
      return {
        type: m.device,
        token: m.device_token,
      };
    })
    .filter(f => f.token);
  return Promise.resolve(rs);
};

const getCustDeviceToken = async (custId) => {
  const logDevices = await customerRepo.findAllDevice(custId);
  if (!logDevices || logDevices.length === 0) {
    return Promise.resolve([]);
  }

  const rs = logDevices
    .map((m) => {
      return {
        type:
          m.cust_devicetype === custConfig.deviceType.IOS ? 'ios' : 'android',
        token: m.cust_devicetoken,
        locale: m.locale,
      };
    })
    .filter(f => f.token);

  return Promise.resolve(rs);
};

/**
 * key title, message
 */
const handleLocaleMessage = (key, localeStr, locale, arg) => {
  const push = localeMessage(localeStr, arg, locale); // This mess will push to user
  const rs = {
    [key]: push,
    [`${key}_default_locale`]: localeMessage(
      localeStr,
      arg,
      commonConfig.baseLanguage
    ),
    locale,
    translations: {},
  };
  commonConfig.localeList.forEach((m) => {
    if (m !== commonConfig.baseLanguage) {
      rs.translations[m] = {
        [key]: localeMessage(localeStr, arg, m),
      };
    }
  });
  return rs;
};

/**
 *
 * @param {*} token
 * @param {*} event
 * @param {*} data {Object} {
 *          type
 *          refer_id
 *          refer_schema
 *          image:{media_id,default_path,default)thumbnail}
 * }
 * @param {*} title
 * @param {*} message
 * @param {*} from send from user
 * @param {*} to send to user
 * @param {*} app current app (ninja,customer,admin)
 * @param {*} localeConstant locale constant string in locales folder
 */
const sendToDeviceCustomEvent = async (
  userId,
  event,
  titleObj,
  messageObj,
  data,
  from,
  to
) => {
  // The Firebase token of the device which will get the notification
  // It can be a string or an array of strings

  // save notify message without wait push success

  const notifiData = {
    type: event,
    ...data,
  };

  const { title = localeMessage('common.notification'), locale } = titleObj;
  const { message } = messageObj;

  // notificationService.newNotifyFromFCM(
  //   titleObj,
  //   messageObj,
  //   event,
  //   data,
  //   from,
  //   to,
  //   notifiData,
  //   locale
  // )

  // PUSH NOTIFY
  pushMessage(
    userId,
    event,
    title,
    message,
    data,
    to.app,
    titleObj,
    messageObj
  );
};

const pushMessage = async function (
  userId,
  event,
  title,
  message,
  data,
  app = commonConfig.appType.customer,
  titleObj = {},
  messageObj = {}
) {
  // PUSH NOTIFY
  let firebaseTokens = '';
  let isCusApp = false;
  switch (app) {
    case commonConfig.appType.customer:
      firebaseTokens = await getCustDeviceToken(userId);
      isCusApp = true;
      break;
    case commonConfig.appType.ninja:
      firebaseTokens = await getCleanerDeviceToken(userId);
      break;
    default:
      break;
  }

  if (!firebaseTokens || firebaseTokens.length === 0) {
    return Promise.resolve();
  }

  for (let index = 0; index < firebaseTokens.length; index++) {
    const element = firebaseTokens[index];
    const { message_default_locale } = messageObj;
    const { title_default_locale } = titleObj;

    title = title_default_locale || title;
    message = message_default_locale || message;

    if (element.locale && element.locale !== commonConfig.baseLanguage) {
      // Hanlde message and title with device locale
      const ttLocale = _.get(titleObj, `translations[${element.locale}].title`);
      if (ttLocale) {
        title = ttLocale;
      }
      const msgLocale = _.get(
        messageObj,
        `translations[${element.locale}].message`
      );
      if (msgLocale) {
        message = msgLocale;
      }
    }
    const now = moment.tz(timezone);
    if (now.hours <= checkHour) {
      logger.info('Android Push Log GTE 6 AM: ', {
        event,
        userId,
        title,
        message,
        element,
        data,
      });
    }

    if (!title || !message) {
      logger.error('Android Push Missing Message: ', {
        event,
        userId,
        title,
        message,
        element,
        data,
      });
      continue;
    }
    if (element.type === cleanConfig.cleanerDevice.ios) {
      // SEND TO IOS
      sendToIOSDevice(element.token, event, title, message, data, apnProvider);
    } else {
      // SEND TO ANDROID
      sendToAndroidDevice(element.token, event, title, message, data);
    }
  }
  return Promise.resolve(firebaseTokens);
};

const sendToAndroidDevice = async (
  token,
  event,
  title,
  message,
  data,
  type
) => {
  // The Firebase token of the device which will get the notification
  // It can be a string or an array of strings
  if (!token || token.length === 0) {
    return Promise.resolve();
  }
  const payload = {
    notification: {
      title,
      body: message,
    },
    data: {
      type, // Notification Type
      data: JSON.stringify(data), // This is JSON object but it converted to string. You need parse it in app
    },
  };

  const options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24, // 1 day
  };
  try {
    const results = await firebase
      .messaging()
      .sendToDevice(token, payload, options);
    return Promise.resolve(results);
  } catch (error) {
    logger.error('Android Push', { event, title, message, token, data, error });
    console.log(`Error Android Push Notification:${error}`);
    return Promise.resolve();
  }
};

/**
 *
 * @param {*} token
 * @param {*} event
 * @param {*} title
 * @param {*} message
 * @param {*} data
 * @param {*} provider
 * @returns
 */
const sendToIOSDevice = function (
  token,
  event,
  title,
  message,
  data,
  provider = apnProvider
) {
  if (!token || token.length === 0) {
    return;
  }
  const note = new apn.Notification();
  note.expiry = Math.floor(Date.now() / 1000) + 3600;
  // note.badge = 3;
  note.topic = 'com.ninewith.festfive'; // this is the bundle name of your application.This key is needed for production
  note.sound = 'ping.aiff';
  note.alert = `${message}`;
  note.title = title;
  note.setContentAvailable(1);
  note.payload = {
    title,
    message,
    type: event,
    data,
  };
  provider.send(note, token).catch((error) => {
    logger.error('IOS Push', { event, title, message, token, data, error });
    console.log(`Error IOS Push Notification:${error}`);
  });
};

/**
 * Send multiple notifications with same message
 * @param {*} tokens []
 * @param {String} title
 * @param {String} message
 * @param {Object} data
 */
const sendMulti = async function (
  tokens = [],
  title,
  message,
  data
) {
  const pushingInterval = setInterval(() => {
    const eachTokens = tokens.splice(0, MAX_USERS_PUSH);
    console.log({ eachTokens });

    if (!eachTokens.length) {
      return clearInterval(pushingInterval);
    }
    sendToAndroidDevice(eachTokens, title, message, data);
  }, PUSHING_TIME_INTERVAL);
};

export {
  handleLocaleMessage,
  localeMessage,
  sendToDeviceCustomEvent,
  pushMessage,
  sendMulti,
  sendToAndroidDevice,
  sendToIOSDevice,
};
