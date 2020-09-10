/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import i18n from 'i18n';
import { SettingSystem, UserLucky, User, GoldenTicket } from '../../models';
import { ObjectId } from '../../utils/mongoose';
import userLuckyConfig from '../userLucky/config';
import userService from '../user/service'
/**
 *
 * @param {*} query
 * @returns
 */
const list = async () => {
  const setting = await SettingSystem.findOne();
  if (!setting) {
    return null;
  }

  return setting.goldenTicket;
};

/**
 *
 * @param {*} query
 * @returns
 */
const findUserLucky = async (userId) => {
  const [user, userLucky] = await Promise.all([
    User.findById(ObjectId(userId)),
    UserLucky.findOne({
      deletedAt: { $eq: null },
      user: ObjectId(userId),
      isPlayed: false,
      type: userLuckyConfig.type.DEFAULT,
    }),
  ]);

  if (user.isGoldenTicket) {
    throw new Error(JSON.stringify({
      message: i18n.__('user.isGoldenTicket'),
    }));
  }

  let res = null;

  if (userLucky) {
    res = await GoldenTicket.findById(ObjectId(userLucky.goldenTicket));
    user.isGoldenTicket = true;
    userLucky.isPlayed = true;
    await Promise.all([
      userService.updateOne(userId, { isGoldenTicket: true }),
      updateUserLucky(userId, { isPlayed: true })
    ])
  } else {
    const listGolden = await GoldenTicket.find({
      deletedAt: { $eq: null },
      isOK: true,
      random: { $gt: 0 },
    });

    if (listGolden.length > 0) {
      res = _.sampleSize(listGolden, 1)[0];
      user.isGoldenTicket = true;

      if (res.countUser >= res.random) {
        await Promise.all([
          userService.updateOne(userId, { isGoldenTicket: true }),
          GoldenTicket.findOneAndUpdate(
            {
              _id: ObjectId(res._id),
            },
            {
              isOK: false,
            },
            { new: true },
          )
        ])
        return {
          name: 'lucky',
          random: 0,
          countUser: 0,
          isOK: true,
          deletedAt: null,
          imageLucky:
            'https://keno-techain-dev.s3.ap-southeast-1.amazonaws.com/public/images/2021-4-20/22/4847024b07caf6425479a2ff61ce8da5_origin',
        };
      }

      await Promise.all([
        userService.updateOne(userId, { isGoldenTicket: true }),
        UserLucky.create({
          user: ObjectId(userId),
          goldenTicket: res._id,
          isPlayed: true,
          type: userLuckyConfig.type.LUCKY,
        }),
        GoldenTicket.findOneAndUpdate(
          {
            _id: ObjectId(res._id),
          },
          {
            $inc: { countUser: 1 },
          },
          { new: true },
        ),
      ]);
    } else {
      return {
        name: 'lucky',
        random: 0,
        countUser: 0,
        isOK: true,
        deletedAt: null,
        imageLucky:
          'https://keno-techain-dev.s3.ap-southeast-1.amazonaws.com/public/images/2021-4-20/22/4847024b07caf6425479a2ff61ce8da5_origin',
      };
    }
  }

  return res;
};

const updateUserLucky = async (userId, data) => {
  return UserLucky.findOneAndUpdate({ user: new ObjectId(userId) }, data, { new: true })
}

export default {
  list,
  findUserLucky,
};
