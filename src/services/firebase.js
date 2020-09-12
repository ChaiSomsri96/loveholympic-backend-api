import env from '../utils/env';
import logger from '../logger';

const firebase = require('firebase-admin');

const MAX_USERS_PUSH = 1000;
const PUSHING_TIME_INTERVAL = 1000;

const serviceAccount = env.isProduction()
  ? require('./firebase-adminsdk.json')
  : require('./firebase-dev-adminsdk.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

const sendToAndroidDevice = async (token, title, message, data, type) => {
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
    logger.error('Android Push', { title, message, token, data, error });
    console.log(`Error Android Push Notification: ${error}`);
    return Promise.resolve();
  }
};

const sendToIOSDevice = async (
  token,
  // event,
  title,
  message,
  data,
  type,
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
    logger.error('iOS Push', { title, message, token, data, error });
    console.log(`Error iOS Push Notification: ${error}`);
    return Promise.resolve();
  }
};

/**
 * Send multiple notifications with same message
 * @param {*} tokens []
 * @param {*} deviceType android or ios
 * @param {String} title
 * @param {String} message
 * @param {Object} data
 */
const sendMulti = async function (
  tokens = [],
  title,
  message,
  data,
) {
  const pushingInterval = setInterval(() => {
    const eachTokens = tokens.splice(0, MAX_USERS_PUSH);
    if (!eachTokens.length) {
      return clearInterval(pushingInterval);
    }
    sendToAndroidDevice(eachTokens, title, message, data);
  }, PUSHING_TIME_INTERVAL);
};

export { sendToAndroidDevice, sendToIOSDevice, sendMulti };
