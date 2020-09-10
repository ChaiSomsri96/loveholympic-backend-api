/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import {
  Admin,
  Area,
  Hobby,
  Personality,
  SettingSystem,
  Banner,
} from '../../models';
import bannerConfig from '../banner/config';

/**
 *
 * @param {*} query
 * @returns
 */
const getSetting = async () => {
  const [
    settingSystem,
    personalities,
    areas,
    hobbies,
    adminAccount,
  ] = await Promise.all([
    SettingSystem.findOne(),
    Personality.find().select('_id, name'),
    Area.find().select('_id, name'),
    Hobby.find().select({
      _id: 1,
      gender: 1,
      name: 1,
    }),
    Admin.findOne().select({
      _id: 1,
      name: 1,
      avatar: 1,
    }),
  ]);

  const stData = settingSystem ? settingSystem.setting : null;
  const isOpenCloseLoveHolympic = settingSystem
    ? settingSystem.isOpenCloseLoveHolympic
    : false;
  const timeFrom = settingSystem ? settingSystem.timeFrom : null;
  const timeTo = settingSystem ? settingSystem.timeTo : null;

  // isPlayGoldenTicket
  let isPlayGoldenTicket = false;
  if (settingSystem && settingSystem.goldenTicket) {
    const { timeFrom: gtimeFrom, timeTo: gtimeTo } = settingSystem.goldenTicket;
    if (moment().isBefore(gtimeFrom) || moment().isAfter(gtimeTo)) {
      isPlayGoldenTicket = false;
    } else {
      isPlayGoldenTicket = true;
    }
  }

  return {
    setting: {
      ...stData,
      isOpenCloseLoveHolympic,
      isPlayGoldenTicket,
      timeFrom,
      timeTo,
    },
    personalities,
    areas,
    hobbies,
    adminAccount,
  };
};

/**
 *
 */
const loholGood = async () => {
  const dataLoholGood = await Banner.find({
    type: bannerConfig.typeBanner.LOHOL_GOOD,
    isActive: true,
  });

  return dataLoholGood;
};

/**
 *
 */
const verifyTimeSystem = async () => {
  const settingSystem = await SettingSystem.findOne();
  if (settingSystem) {
    return {
      timeFrom: settingSystem.timeFrom,
      timeTo: settingSystem.timeTo,
    };
  } else {
    return null;
  }
};

/**
 *
 */
const checkStatus = async () => {
  return null;
};

export default {
  getSetting,
  loholGood,
  verifyTimeSystem,
  checkStatus,
};
