/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import i18n from 'i18n';
import { Area, UserHolympic, UserMatch } from '../../models';
import { ObjectId } from '../../utils/mongoose';
import userService from '../user/service';
import soulTestService from '../soulTest/service';

/**
 *
 * @param {*} data
 * @returns
 */
const create = async (data) => {
  const { userId, area, type, hobbies, personalities } = data;

  const listArea = area.split(',');
  for (let i = 0; i < listArea.length; i++) {
    const areaID = listArea[i];
    const areaObj = await Area.findById(ObjectId(areaID));
    if (!areaObj) {
      throw new Error(JSON.stringify({
        message: i18n.__('area.notFound'),
      }));
    }
  }

  await userService._checkAgeAreaHobbyPersonality(
    ObjectId(listArea[0]),
    hobbies,
    personalities
  );

  let userHolympic = await UserHolympic.findOne({
    user: ObjectId(userId),
    type,
  });

  if (!userHolympic) {
    userHolympic = await UserHolympic.create({
      user: ObjectId(userId),
      ...data,
    });
  }

  return userHolympic;
};

/**
 *
 * @param {*} data
 * @returns
 */
const verify = async ({ userId }) => {
  const dataRealHolympic = await _checkRealHolympicType(userId);
  const isCheckSoulTest = await soulTestService._checkFinishSoulTest(ObjectId(userId));

  return {
    realHolympic: dataRealHolympic,
    soulFriend: dataRealHolympic,
    soulTest: isCheckSoulTest,
    loveSecret: false,
  };
};

/**
 *
 * @param {*} userId
 * @returns
 */
const _checkRealHolympicType = async (userId) => {
  let data = {
    settingTargetProfile: false,
    finalRound: false,
  };
  const [targetProfile, userMatching] = await Promise.all([
    UserHolympic.findOne({
      user: ObjectId(userId),
    }),
    UserMatch.findOne({
      user: ObjectId(userId),
    }),
  ]);

  if (targetProfile) {
    data = {
      ...data,
      settingTargetProfile: true,
    };
  }

  if (userMatching && userMatching.isFinalRound) {
    data = {
      ...data,
      finalRound: true,
    };
  }

  return data;
};

export default {
  create,
  verify,
};
