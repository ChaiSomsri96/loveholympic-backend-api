/* eslint-disable no-underscore-dangle */
import i18n from 'i18n';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import {
  User,
  NotificationSystem,
  Image,
  Banner,
  SettingSystem,
  Comment,
  GoldenTicket,
  // QuestionCategory,
  // Answer,
  // Question,
  Notification,
  UserHolympic,
  LuffingTest,
  UserMatch,
  AdminComment,
  UserLike,
  // Personality,
  // Hobby,
  // Area,
  UserSelectCouple,
  UserLucky,
  UserSoulTest,
  SettingSMS,
  UserReport,
  Area,
  Personality,
  Hobby,
} from '../../models';
import { ObjectId } from '../../utils/mongoose';

/**
 *
 * @param {*} query
 * @returns
 */
const getSetting = async () => {
  let settingSystem = await SettingSystem.findOne().lean();

  if (!settingSystem) {
    settingSystem = await SettingSystem.create({
      setting: {
        iconNotificationSystem: '',
        youtubeHistoryURL: '',
        notificationSystemId: '',
        loholGoodsURL: '',
      },
      isOpenCloseLoveHolympic: true,
      timeFrom: new Date(),
      timeTo: new Date(),
      goldenTicket: {
        timeFrom: '',
        timeTo: '',
        imageGlobal: '',
      },
    }).lean();
  }

  const areas = await Area.find();
  const personalities = await Personality.find();
  const hobbies = await Hobby.find();

  return {
    ...settingSystem,
    areas,
    personalities,
    hobbies,
  };
};

/**
 *
 * @param {*} query
 * @returns
 */
const configSystem = async (body) => {
  let setting = await SettingSystem.findOne();
  if (setting) {
    setting = await SettingSystem.findOneAndUpdate(
      {
        _id: setting._id,
      },
      body,
      { new: true },
    );
  } else {
    setting = await SettingSystem.create({
      ...body,
      setting: {
        iconNotificationSystem: '',
        youtubeHistoryURL: '',
        loholGoodsURL: '',
        notificationSystemId: '',
      },
    });
  }

  return setting;
};

/**
 *
 * @returns
 */
const create = async (data) => {
  let settingSystem = await SettingSystem.findOne();
  const { notificationSystemId } = data;
  if (notificationSystemId) {
    const notificationSystem = await NotificationSystem.findById(ObjectId(notificationSystemId));
    if (!notificationSystem) {
      throw new Error(JSON.stringify({
        message: i18n.__('notificationSystem.notFound'),
      }));
    }
  }

  if (!isEmpty(data)) {
    if (settingSystem) {
      settingSystem = await SettingSystem.findByIdAndUpdate(
        { _id: settingSystem.id },
        {
          setting: {
            ...settingSystem.setting,
            ...data,
          },
        },
        { new: true },
      );
    } else {
      settingSystem = await SettingSystem.create({
        setting: {
          // ...settingSystem.setting,
          ...data,
        },
      });
    }

    return settingSystem;
  }

  return null;
};

/**
 * Reset all data test
 */
const resetDataTest = async () => {
  // remove chatting
  await Promise.all([
    UserReport.remove({}),
    UserSoulTest.remove({}),
    UserLucky.remove({
      type: 'lucky',
    }),
    UserLucky.updateMany(
      {
        isPlayed: true,
      },
      {
        isPlayed: false,
      },
    ),
    UserMatch.remove({}),
    Notification.remove({}),
    UserSelectCouple.remove({}),
    LuffingTest.remove({}),
    User.updateMany(
      {},
      {
        totalHeart: 0,
        ranking: 0,
        userCouple: null,
        isGoldenTicket: false,
        isFinishSoulTest: false,
      },
    ),
    GoldenTicket.updateMany(
      {},
      {
        countUser: 0,
        isOK: true,
      },
    ),
  ]);

  return {
    message: 'success',
  };
};

/**
 * Reset all data
 */
const resetAllData = async () => {
  await Promise.all([
    User.updateMany({ codeTesting: { $eq: true } }, { userID: uuidv4() }),
    // User.remove({
    //   codeTesting: { $ne: true },
    // }),
    User.updateMany({
      codeTesting: { $ne: true },
    }, {
      deletedAt: new Date(),
    }),
    NotificationSystem.remove({}),
    Image.remove({}),
    Banner.remove({}),
    SettingSystem.remove({}),
    Comment.remove({}),
    GoldenTicket.remove({}),
    // QuestionCategory.remove({}),
    // Answer.remove({}),
    // Question.remove({}),
    Notification.remove({}),
    UserHolympic.remove({}),
    LuffingTest.remove({}),
    UserMatch.remove({}),
    AdminComment.remove({}),
    UserLike.remove({}),
    // Personality.remove({}),
    // Hobby.remove({}),
    // Area.remove({}),
    UserSelectCouple.remove({}),
    UserLucky.remove({}),
    UserSoulTest.remove({}),
    SettingSMS.remove({}),
    UserReport.remove({}),
  ]);

  return {
    message: 'success',
  };
};

export default {
  getSetting,
  create,
  configSystem,
  resetDataTest,
  resetAllData,
};
