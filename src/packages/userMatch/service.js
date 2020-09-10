/* eslint-disable array-callback-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
import i18n from 'i18n';
import _ from 'lodash';
import {
  User,
  UserHolympic,
  UserMatch,
  UserSelectCouple,
  Notification,
} from '../../models';
import { ObjectId } from '../../utils/mongoose';
import globalConfig from '../../configs';
import config from './config';
import notificationConfig from '../notification/config';
import luffingTestService from '../luffingTest/service';
import userService from '../user/service';
import { sendToAndroidDevice } from '../../services/firebase';
import { notifyApp } from '../../services/fcmConstant';

/**
 *
 * @param {*} currentMatch
 */
const _getColorBackground = (currentMatch) => {
  let color = null;

  switch (currentMatch) {
    case config.noMatch.M_32:
      color = config.colorMatching.MATCHING_32;
      break;
    case config.noMatch.M_16:
      color = config.colorMatching.MATCHING_16;
      break;
    case config.noMatch.M_8:
      color = config.colorMatching.MATCHING_8;
      break;
    case config.noMatch.M_4:
      color = config.colorMatching.MATCHING_4;
      break;
    default:
      break;
  }

  return color;
};

/**
 *
 * @param {*} userObj
 */
const _validatorFindCoupleRealHolympic = async (userObj) => {
  const isCheckSettingLineProfile = await luffingTestService._checkSettingLineMyProfile(userObj);

  if (!isCheckSettingLineProfile) {
    throw new Error(JSON.stringify({
      message: i18n.__('user.notSettingLineMyProfile'),
    }));
  }

  const isCheckLuffingTest = await userService._checkFinishLuffingTest(userObj._id);
  if (!isCheckLuffingTest) {
    throw new Error(JSON.stringify({
      message: i18n.__('user.notFinishLuffingTest'),
    }));
  }

  const { isRegisterProfile, _id } = userObj;

  if (!isRegisterProfile) {
    throw new Error(JSON.stringify({
      message: i18n.__('user.notFinshProfile'),
    }));
  }

  if (userObj.userCouple) {
    throw new Error(JSON.stringify({
      message: i18n.__('user.userHaveCoupled'),
    }));
  }

  const userHolympic = await UserHolympic.findOne({
    user: ObjectId(_id),
    $or: [
      {
        type: globalConfig.typeHolympic.REAL_HOLYMPIC,
      },
      {
        type: globalConfig.typeHolympic.SOUL_FRIEND,
      },
    ],
  });

  if (!userHolympic) {
    throw new Error(JSON.stringify({
      message: i18n.__('userMatching.notSettingTargetLine'),
    }));
  }

  return userHolympic;
};

/**
 *
 * @param {*} baseCondition
 * @param {*} queryCondition
 * @param {*} userHolympic
 * @returns
 */
const _getDataFind = async (baseCondition, queryCondition, userHolympic) => {
  const ageInt = userHolympic.age.split('-');
  let userArr = await User.find(queryCondition)
    .select('_id')
    .sort({ createdAt: -1 });

  if (userArr.length < 32) {
    const userByAge = await User.find({
      ...baseCondition,
      age: { $gte: parseInt(ageInt[0], 10), $lte: parseInt(ageInt[1], 10) },
      $and: [
        { _id: { $nin: userArr.map(u => u._id) } },
        { _id: baseCondition._id },
      ],
    })
      .select('_id')
      .sort({ createdAt: -1 });

    if (userArr.length + userByAge.length >= 32) {
      userArr = _.unionBy(userArr, userByAge, '_id');
    } else {
      userArr = _.unionBy(userArr, userByAge, '_id');
      const userByHobbies = await User.find({
        ...baseCondition,
        hobbies: { $in: userHolympic.hobbies.split(',') },
        $and: [
          { _id: { $nin: userArr.map(u => u._id) } },
          { _id: baseCondition._id },
        ],
      })
        .select('_id')
        .sort({ createdAt: -1 });

      if (userArr.length + userByHobbies.length >= 32) {
        userArr = _.unionBy(userArr, userByHobbies, '_id');
      } else {
        userArr = _.unionBy(userArr, userByHobbies, '_id');
        const userByPersonalities = await User.find({
          ...baseCondition,
          personalities: { $in: userHolympic.personalities.split(',') },
          $and: [
            { _id: { $nin: userArr.map(u => u._id) } },
            { _id: baseCondition._id },
          ],
        })
          .select('_id')
          .sort({ createdAt: -1 });

        if (userArr.length + userByPersonalities.length >= 32) {
          userArr = _.unionBy(userArr, userByPersonalities, '_id');
        } else {
          userArr = _.unionBy(userArr, userByPersonalities, '_id');
          const userByArea = await User.find({
            ...baseCondition,
            area: { $in: userHolympic.area.split(',') },
            $and: [
              { _id: { $nin: userArr.map(u => u._id) } },
              { _id: baseCondition._id },
            ],
          })
            .select('_id')
            .sort({ createdAt: -1 });

          if (userArr.length + userByArea.length >= 32) {
            userArr = _.unionBy(userArr, userByArea, '_id');
          } else {
            userArr = _.unionBy(userArr, userByArea, '_id');
            const arrID = await userArr.map(u => u._id);

            const userAll = await User.find({
              userCouple: { $eq: null },
              isRegisterProfile: true,
              deletedAt: { $eq: null },
              isActive: true,
              isUseCode: true,
              $and: [{ _id: { $nin: arrID } }, { _id: baseCondition._id }],
            })
              .select('_id')
              .sort({ createdAt: -1 });

            if (userArr.length + userAll.length >= 32) {
              const userRandom = _.sampleSize(userAll, 32 - userArr.length);
              userArr = _.unionBy(userArr, userRandom, '_id');
            } else {
              userArr = null;
            }
          }
        }
      }
    }
  }

  return userArr;
};

/**
 *
 * @param {*} param0
 * @returns
 */
const findUserMatching = async ({ userId }) => {
  let user1Id = null;
  let user2Id = null;
  let user1 = null;
  let user2 = null;
  let cMatch = null;
  let cRound = null;

  const userObj = await User.findById(ObjectId(userId)).lean();
  const userHolympic = await _validatorFindCoupleRealHolympic(userObj);
  const notifications = await Notification.find({
    deletedAt: { $eq: null },
    status: {
      $in: [
        notificationConfig.status.ACCEPTED,
        notificationConfig.status.COUPLED,
      ],
    },
  });

  const userIDArr = [userId];
  notifications.map((notify) => {
    userIDArr.push(notify.user);
    userIDArr.push(notify.userSelected);
  })
  const ageInt = userHolympic.age.split('-');

  const baseCondition = {
    _id: { $nin: userIDArr },
    userCouple: { $eq: null },
    isRegisterProfile: true,
    deletedAt: { $eq: null },
    isActive: true,
    isUseCode: true,
    gender: userHolympic.gender,
  };

  const queryCondition = {
    ...baseCondition,
    age: { $gte: parseInt(ageInt[0], 10), $lte: parseInt(ageInt[1], 10) },
    hobbies: { $in: userHolympic.hobbies.split(',') },
    personalities: { $in: userHolympic.personalities.split(',') },
    area: { $in: userHolympic.area.split(',') },
  };

  let userMatching = await UserMatch.findOne({
    user: ObjectId(userId),
    // currentMatch: { $ne: null },
  });

  if (userMatching && userMatching.isFinalRound) {
    throw new Error(JSON.stringify({
      message: '원하시는 상대를 찾지 못 합니다.', // i18n.__('userMatching.finalRounded'),
      status: config.status.FINAL_ROUNDED,
    }));
  }

  if (userMatching) {
    const { currentRound, currentMatch } = userMatching;

    if (currentRound && currentMatch) {
      cMatch = currentMatch;
      cRound = currentRound;
      user1Id = userMatching.userCouples[0];
      user2Id = userMatching.userCouples[1];
    } else {
      const userArr = await _getDataFind(
        baseCondition,
        queryCondition,
        userHolympic
      );

      if (!userArr || !userArr.length) {
        return {
          message: '원하시는 상대를 찾지 못 합니다.',
        };
      }

      const idArr = userArr.map(item => item._id);
      const matching32Arr = _.sampleSize(idArr, 32);
      const twoUserSelect = _.sampleSize(matching32Arr, 2);

      const updateUserMatchData = {
        matching32: matching32Arr,
        userCouples: twoUserSelect,
      };

      userMatching = await UserMatch.findOneAndUpdate(
        { _id: userMatching._id },
        updateUserMatchData,
        { new: true }
      );
      if (twoUserSelect.length > 1) {
        user1Id = twoUserSelect[0];
        user2Id = twoUserSelect[1];
      }

      cMatch = 32;
      cRound = 1;
    }
  } else {
    const userArr = await _getDataFind(
      baseCondition,
      queryCondition,
      userHolympic
    );

    if (!userArr || !userArr.length) {
      return {
        message: '원하시는 상대를 찾지 못 합니다.',
      };
    }

    const idArr = userArr.map(item => item._id);
    const matching32Arr = _.sampleSize(idArr, 32);
    const twoUserSelect = _.sampleSize(matching32Arr, 2);

    const createUserMatchData = {
      user: ObjectId(userId),
      matching32: matching32Arr,
      userCouples: twoUserSelect,
      type: globalConfig.typeHolympic.REAL_HOLYMPIC,
    };

    userMatching = await UserMatch.create(createUserMatchData);

    if (twoUserSelect.length > 1) {
      user1Id = twoUserSelect[0];
      user2Id = twoUserSelect[1];
    }

    cMatch = 32;
    cRound = 1;
  }

  if (user1Id && user2Id) {
    [user1, user2] = await Promise.all([
      User.findById(user1Id).populate({
        path: 'avatars',
        ref: 'Image',
      }),
      User.findById(user2Id).populate({
        path: 'avatars',
        ref: 'Image',
      }),
    ]);
  }

  return {
    currentMatch: cMatch,
    currentRound: cRound,
    couples: [user1, user2],
    colorBackground: _getColorBackground(cMatch),
  };
};

/**
 *
 * @param {*} param0
 * @returns
 */
const findSoulFriend = async ({ userId }) => {
  let user1Id = null;
  let user2Id = null;
  let user1 = null;
  let user2 = null;
  let cMatch = null;
  let cRound = null;

  const userObj = await User.findById(ObjectId(userId)).lean();
  const isCheckSettingLineProfile = await luffingTestService._checkSettingLineMyProfile(userObj);

  if (!isCheckSettingLineProfile) {
    throw new Error(JSON.stringify({
      message: '원하시는 상대를 찾지 못 합니다.', // i18n.__('user.notSettingLineMyProfile'),
    }));
  }

  if (userObj.userCouple) {
    throw new Error(JSON.stringify({
      message: '원하시는 상대를 찾지 못 합니다.', // i18n.__('user.userHaveCoupled'),
    }));
  }

  const userHolympic = await UserHolympic.findOne({
    user: ObjectId(userId),
    $or: [
      {
        type: globalConfig.typeHolympic.REAL_HOLYMPIC,
      },
      {
        type: globalConfig.typeHolympic.SOUL_FRIEND,
      },
    ],
  });

  if (!userHolympic) {
    throw new Error(JSON.stringify({
      message: '원하시는 상대를 찾지 못 합니다.', // i18n.__('userMatching.notSettingTargetLine'),
    }));
  }

  const ageInt = userHolympic.age.split('-');
  const baseCondition = {
    _id: { $ne: ObjectId(userId) },
    userCouple: { $eq: null },
    isRegisterProfile: true,
    deletedAt: { $eq: null },
    isActive: true,
    isUseCode: true,
    gender: userHolympic.gender,
  };
  const queryCondition = {
    ...baseCondition,
    age: { $gte: parseInt(ageInt[0], 10), $lte: parseInt(ageInt[1], 10) },
    hobbies: { $in: userHolympic.hobbies.split(',') },
    personalities: { $in: userHolympic.personalities.split(',') },
    area: { $in: userHolympic.area.split(',') },
  };

  let userMatching = await UserMatch.findOne({
    user: ObjectId(userId),
  });

  if (userMatching && userMatching.isFinalRound) {
    throw new Error(JSON.stringify({
      message: '원하시는 상대를 찾지 못 합니다.', // i18n.__('userMatching.finalRounded'),
      status: config.status.FINAL_ROUNDED,
    }));
  }

  if (userMatching) {
    const { currentRound, currentMatch } = userMatching;

    if (currentRound && currentMatch) {
      cMatch = currentMatch;
      cRound = currentRound;
      user1Id = userMatching.userCouples[0];
      user2Id = userMatching.userCouples[1];
    } else {
      const userArr = await _getDataFind(
        baseCondition,
        queryCondition,
        userHolympic
      );

      if (!userArr || !userArr.length) {
        return {
          message: '원하시는 상대를 찾지 못 합니다.',
        };
      }

      const idArr = userArr.map(item => item._id);
      const matching32Arr = _.sampleSize(idArr, 32);
      const twoUserSelect = _.sampleSize(matching32Arr, 2);

      const updateUserMatchData = {
        matching32: matching32Arr,
        userCouples: twoUserSelect,
      };

      userMatching = await UserMatch.findOneAndUpdate(
        { _id: userMatching._id },
        updateUserMatchData,
        { new: true }
      );
      if (twoUserSelect.length > 1) {
        user1Id = twoUserSelect[0];
        user2Id = twoUserSelect[1];
      }

      cMatch = 32;
      cRound = 1;
    }
  } else {
    const userArr = await _getDataFind(
      baseCondition,
      queryCondition,
      userHolympic
    );

    if (!userArr || !userArr.length) {
      return {
        message: '원하시는 상대를 찾지 못 합니다.',
      };
    }

    const idArr = userArr.map(item => item._id);
    const matching32Arr = _.sampleSize(idArr, 32);
    const twoUserSelect = _.sampleSize(matching32Arr, 2);

    const createUserMatchData = {
      user: ObjectId(userId),
      matching32: matching32Arr,
      userCouples: twoUserSelect,
      type: globalConfig.typeHolympic.SOUL_FRIEND,
    };

    userMatching = await UserMatch.create(createUserMatchData);

    if (twoUserSelect.length > 1) {
      user1Id = twoUserSelect[0];
      user2Id = twoUserSelect[1];
    }

    cMatch = 32;
    cRound = 1;
  }

  if (user1Id && user2Id) {
    [user1, user2] = await Promise.all([
      User.findById(user1Id).populate({
        path: 'avatars',
        ref: 'Image',
      }),
      User.findById(user2Id).populate({
        path: 'avatars',
        ref: 'Image',
      }),
    ]);
  }

  return {
    currentMatch: cMatch,
    currentRound: cRound,
    couples: [user1, user2],
    colorBackground: _getColorBackground(cMatch),
  };
};

/**
 *
 * @param {*} param0
 */
const nextMatchRound = async ({ match, round, userId, userSelectedId }) => {
  let twoSelected = null;
  let user1 = null;
  let user2 = null;

  if (
    (match === 32 && (round > 16 || round < 1)) ||
    (match === 16 && (round > 8 || round < 1)) ||
    (match === 8 && (round > 4 || round < 1)) ||
    (match === 4 && (round > 2 || round < 1))
  ) {
    throw new Error(JSON.stringify({
      message: i18n.__('round.invalid'),
    }));
  }

  const userSelected = await User.findById(ObjectId(userSelectedId));

  if (!userSelected) {
    throw new Error(JSON.stringify({
      message: i18n.__('user.notFinishSetupProfile'),
    }));
  }

  const userMatching = await UserMatch.findOne({
    user: ObjectId(userId),
  });

  if (!userMatching) {
    throw new Error(JSON.stringify({
      message: i18n.__('userMatching.invalid'),
    }));
  }

  if (!userMatching.userCouples.includes(ObjectId(userSelectedId))) {
    throw new Error(JSON.stringify({
      message: i18n.__('userSelected.invalid'),
    }));
  }

  if (
    (userMatching.currentMatch && userMatching.currentMatch !== match) ||
    (userMatching.currentRound && userMatching.currentRound !== round)
  ) {
    throw new Error(JSON.stringify({
      message: i18n.__('matchOrRound.invalid'),
    }));
  }

  const userSelectCouple = await UserSelectCouple.findOne({
    user: ObjectId(userId),
    // userSelected: ObjectId(userSelected._id),
    match,
    round,
  });

  if (userSelectCouple) {
    throw new Error(JSON.stringify({
      message: i18n.__('thisMatchRound.exist'),
    }));
  } else {
    await Promise.all([
      UserSelectCouple.create({
        user: ObjectId(userId),
        userSelected: ObjectId(userSelectedId),
        match,
        round,
      }),
      User.findOneAndUpdate(
        { _id: ObjectId(userSelectedId) },
        { $inc: { totalHeart: 1 } },
        { new: true }
      ),
    ]);
  }

  if (match === 32 && round === 16) {
    userMatching.currentMatch = 16;
    userMatching.currentRound = 1;
  } else if (match === 16 && round === 8) {
    userMatching.currentMatch = 8;
    userMatching.currentRound = 1;
  } else if (match === 8 && round === 4) {
    userMatching.currentMatch = 4;
    userMatching.currentRound = 1;
  } else if (match === 4 && round === 2) {
    userMatching.currentMatch = 2;
    userMatching.currentRound = 1;
  } else {
    userMatching.currentMatch = parseInt(match, 10);
    userMatching.currentRound = parseInt(round + 1, 10);
  }

  if (match === 32) {
    userMatching.matching16 = userMatching.matching16.concat(ObjectId(userSelectedId));
    if (round === 16) {
      twoSelected = _.sampleSize(userMatching.matching16, 2);
      userMatching.userCouples = twoSelected;
      userMatching.matching32 = null;
    } else {
      const idArr = userMatching.matching32.filter(uID => !userMatching.userCouples.includes(uID));
      twoSelected = _.sampleSize(idArr, 2);
      userMatching.userCouples = twoSelected;
      userMatching.matching32 = idArr;
    }
  } else if (match === 16) {
    userMatching.matching8 = userMatching.matching8.concat(ObjectId(userSelectedId));
    if (round === 8) {
      twoSelected = _.sampleSize(userMatching.matching8, 2);
      userMatching.userCouples = twoSelected;
      userMatching.matching16 = null;
    } else {
      const idArr = userMatching.matching16.filter(uID => !userMatching.userCouples.includes(uID));
      twoSelected = _.sampleSize(idArr, 2);
      userMatching.userCouples = twoSelected;
      userMatching.matching16 = idArr;
    }
  } else if (match === 8) {
    userMatching.matching4 = userMatching.matching4.concat(ObjectId(userSelectedId));
    if (round === 4) {
      twoSelected = _.sampleSize(userMatching.matching4, 2);
      userMatching.userCouples = twoSelected;
      userMatching.matching8 = null;
    } else {
      const idArr = userMatching.matching8.filter(uID => !userMatching.userCouples.includes(uID));
      twoSelected = _.sampleSize(idArr, 2);
      userMatching.userCouples = twoSelected;
      userMatching.matching8 = idArr;
    }
  } else if (match === 4) {
    userMatching.matching2 = userMatching.matching2.concat(ObjectId(userSelectedId));
    if (round === 2) {
      twoSelected = _.sampleSize(userMatching.matching2, 2);
      userMatching.userCouples = twoSelected;
      userMatching.matching4 = null;
    } else {
      const idArr = userMatching.matching4.filter(uID => !userMatching.userCouples.includes(uID));
      twoSelected = _.sampleSize(idArr, 2);
      userMatching.userCouples = twoSelected;
      userMatching.matching4 = idArr;
    }
  }

  await userMatching.save();

  if (twoSelected.length > 1) {
    [user1, user2] = await Promise.all([
      User.findById(twoSelected[0]).populate({
        path: 'avatars',
        ref: 'Image',
      }),
      User.findById(twoSelected[1]).populate({
        path: 'avatars',
        ref: 'Image',
      }),
    ]);
  }

  return {
    currentMatch: userMatching.currentMatch,
    currentRound: userMatching.currentRound,
    couples: [user1, user2],
    colorBackground: _getColorBackground(userMatching.currentMatch),
  };
};

/**
 *
 * @param {*} param0
 */
const finalRealHolympic = async ({ userId, userSelectedId }) => {
  const [userMatching, userSelected, userObj] = await Promise.all([
    UserMatch.findOne({
      user: ObjectId(userId),
    }).populate({
      path: 'user',
      ref: 'User',
    }),
    User.findById(ObjectId(userSelectedId)),
    User.findById(ObjectId(userId)),
  ]);

  if (!userSelected) {
    throw new Error(JSON.stringify({
      message: i18n.__('user.notFound'),
    }));
  }

  if (!userMatching) {
    throw new Error(JSON.stringify({
      message: i18n.__('userMatch.notFound'),
    }));
  }

  if (
    userMatching.currentMatch !== 2 ||
    userMatching.currentRound !== 1 ||
    !userMatching.matching2.includes(ObjectId(userSelectedId))
  ) {
    throw new Error(JSON.stringify({
      message: i18n.__('userMatch.userNotExistInFinalRound'),
    }));
  }

  userMatching.isFinalRound = true;

  const [selectedCouples, userSelectedObj, notification] = await Promise.all([
    UserSelectCouple.create({
      user: ObjectId(userId),
      userSelected: ObjectId(userSelectedId),
      match: 2,
      round: 1,
    }),
    User.findOneAndUpdate(
      { _id: ObjectId(userSelectedId) },
      { $inc: { totalHeart: 1 } },
      { new: true },
    ),
    Notification.create({
      user: ObjectId(userSelectedId),
      userSelected: ObjectId(userId),
      typeMatching: notificationConfig.type.REAL_HOLYMPIC,
      name: _.get(userObj, 'nickname', ''),
      message: userObj.nickname
        ? '님께서 당신을 최종 선택 하셨습니다'
        : '당신을 최종으로 선택한 사람이 생겼습니다.',
    }),
    userMatching.save(),
  ]);

  // push FCM userSelectedObj
  console.log({ selectedCouples, userSelectedObj });
  const { deviceToken } = userSelected;
  const message = userObj.nickname
    ? '님께서 당신을 최종 선택 하셨습니다'
    : '당신을 최종으로 선택한 사람이 생겼습니다.';

  sendToAndroidDevice(
    deviceToken,
    globalConfig.APP_NAME,
    message,
    null,
    `${notifyApp.finalRoundRealHolympic.name}`,
  );

  return notification;
};

/**
 *
 * @param {*} userId
 * @returns
 */
const resetUserMatching = async (userId) => {
  if (process.env.NODE_ENV !== 'production') {
    const user = await User.findById(ObjectId(userId));
    user.userCouple = null;

    await Promise.all([
      user.save(),
      UserSelectCouple.remove({
        user: ObjectId(userId),
      }),
      UserMatch.remove({
        user: ObjectId(userId),
      }),
      Notification.remove({
        user: ObjectId(userId),
      }),
    ]);

    return user;
  }

  return null;
};

export default {
  findUserMatching,
  nextMatchRound,
  finalRealHolympic,
  resetUserMatching,
  findSoulFriend,
};
