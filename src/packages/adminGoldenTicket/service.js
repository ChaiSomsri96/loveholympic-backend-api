/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
import i18n from 'i18n';
import _ from 'lodash';
import { GoldenTicket, User, UserLucky, SettingSystem } from '../../models';
import { ObjectId } from '../../utils/mongoose';
import { initialOptions } from '../../utils/pagination';
import config from '../userLucky/config';

/**
 *
 * @param {*} query
 * @returns
 */
const list = async () => {
  const setting = await SettingSystem.findOne();
  const goldenTicket = setting ? setting.goldenTicket : null;
  const tickets = await GoldenTicket.find({
    deletedAt: { $eq: null },
  }).lean();
  const res = [];
  for (let i = 0; i < tickets.length; i++) {
    const gol = tickets[i];
    const data = await UserLucky.find({
      isPlayed: false,
      type: config.type.DEFAULT,
      deletedAt: { $eq: null },
      goldenTicket: ObjectId(gol._id),
    })
      .populate({
        path: 'user',
        ref: 'User',
        select: {
          _id: 1,
          code: 1,
        },
      })
      .lean();
    const listCode = data.map(lucky => lucky.user);
    res.push({
      ...gol,
      users: listCode,
    });
  }

  return {
    ...goldenTicket,
    tickets: res,
  };
};

/**
 *
 * @param {*} query
 * @returns
 */
const listUserLucky = async (query) => {
  const options = initialOptions(query);
  const { limit, skip, sort, page } = options;
  const match = {
    deletedAt: { $eq: null },
    isPlayed: true,
  };

  const [userLuckies, total] = await Promise.all([
    UserLucky.find(match)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate([
        {
          path: 'user',
          ref: 'User',
          select: {
            _id: 1,
            defaultAvatar: 1,
            nickname: 1,
            code: 1,
            phone: 1,
          },
        },
        {
          path: 'goldenTicket',
          ref: 'GoldenTicket',
        },
      ]),
    UserLucky.countDocuments(match),
  ]);

  return {
    results: userLuckies,
    total,
    page,
    limit,
  };
};

/**
 *
 * @param {*} param0
 */
const create = async (body) => {
  const { imageGlobal, tickets, timeFrom, timeTo } = body;
  const settingSystem = await SettingSystem.findOne();
  if (settingSystem) {
    await SettingSystem.findOneAndUpdate(
      {
        _id: settingSystem._id,
      },
      {
        goldenTicket: {
          timeFrom,
          timeTo,
          imageGlobal,
        },
      },
      {
        new: true,
      },
    );
  } else {
    await SettingSystem.create({
      goldenTicket: {
        timeFrom,
        timeTo,
        imageGlobal,
      },
    });
  }

  if (body.isDel) {
    for (let i = 0; i < body.isDel.length; i++) {
      await GoldenTicket.deleteOne({
        _id: ObjectId(body.isDel[i])
      })
    }
  }

  if (tickets.length) {
    for (let i = 0; i < tickets.length; i++) {
      const ticket = tickets[i];
      let data = null;
      if (ticket._id) {
        data = await GoldenTicket.findOneAndUpdate(
          {
            _id: ObjectId(ticket._id),
          },
          {
            name: ticket.name,
            imageLucky: ticket.imageLucky,
            random: ticket.random,
          },
          { new: true },
        );
        const userLuckyByGolden = await UserLucky.find({
          deletedAt: { $eq: null },
          goldenTicket: ObjectId(ticket._id),
          isPlayed: false,
        });
        const userLuckyByGoldenUserID = userLuckyByGolden.map(it => it.user);
        const listUserID = ticket.users;
        const deletedAtID = _.difference(userLuckyByGoldenUserID, listUserID);
        await UserLucky.remove({
          user: { $in: deletedAtID },
        });

        if (listUserID.length) {
          for (let j = 0; j < listUserID.length; j++) {
            const userID = listUserID[j];
            console.log({ userID });
            const uL = await UserLucky.findOne({
              goldenTicket: ObjectId(ticket._id),
              type: config.type.DEFAULT,
              user: ObjectId(userID),
            });
            if (uL) {
              uL.user = ObjectId(userID);
              await uL.save();
            } else {
              await UserLucky.create({
                goldenTicket: ObjectId(ticket._id),
                type: config.type.DEFAULT,
                user: ObjectId(userID),
              });
            }
          }
        } else {
          await UserLucky.remove({
            goldenTicket: ObjectId(data._id),
            type: config.type.DEFAULT,
          });
        }
      } else {
        data = await GoldenTicket.create({
          name: ticket.name,
          imageLucky: ticket.imageLucky,
          random: ticket.random,
        });

        for (let x = 0; x < ticket.users.length; x++) {
          const userID = ticket.users[x];
          await UserLucky.create({
            goldenTicket: ObjectId(data._id),
            type: config.type.DEFAULT,
            user: ObjectId(userID),
          });
        }
      }
    }
  }


  const res = [];
  const prices = await GoldenTicket.find({
    deletedAt: { $eq: null },
  }).lean();
  for (let z = 0; z < prices.length; z++) {
    const gol = prices[z];
    const data = await UserLucky.find({
      isPlayed: false,
      type: config.type.DEFAULT,
      deletedAt: { $eq: null },
      goldenTicket: ObjectId(gol._id),
    })
      .populate({
        path: 'user',
        ref: 'User',
        select: {
          _id: 1,
          code: 1,
        },
      })
      .lean();
    const listCode = data.map(lucky => lucky.user);
    res.push({
      ...gol,
      users: listCode,
    });
  }

  return {
    imageGlobal,
    timeFrom,
    timeTo,
    tickets: res,
  };
};

/**
 *
 * @param {*} param0
 */
const update = async (body) => {
  const {
    image,
    maxUser,
    minUser,
    isActive,
    imageLucky,
    userLuckiesDefault,
    goldenTicketId,
  } = body;

  const goldenTicket = await GoldenTicket.findById(ObjectId(goldenTicketId));
  if (!goldenTicketId) {
    throw new Error(JSON.stringify({
      message: i18n.__('goldenTicket.notFound'),
    }));
  }

  if (image) {
    goldenTicket.image = image;
  }
  if (maxUser) {
    goldenTicket.maxUser = maxUser;
  }
  if (minUser) {
    goldenTicket.minUser = minUser;
  }
  if (isActive) {
    goldenTicket.isActive = isActive;
  }
  if (imageLucky) {
    goldenTicket.imageLucky = imageLucky;
  }
  if (userLuckiesDefault) {
    goldenTicket.userLuckiesDefault = ObjectId(userLuckiesDefault);
  }

  await goldenTicket.save();

  return goldenTicket;
};

/**
 * List User Code
 */
const listUser = async (query) => {
  const { search: txtSearch } = query;
  const userLuckies = await UserLucky.find({ deletedAt: { $eq: null } }).select('_id user');
  const listId = userLuckies.map(uLucky => uLucky.user);
  let match = {
    deletedAt: { $eq: null },
    isActive: true,
    _id: { $nin: listId },
    isUseCode: true,
    isGoldenTicket: false,
    // isRegisterProfile: true,
  };

  if (txtSearch) {
    match = {
      ...match,
      $or: [
        {
          code: { $regex: txtSearch, $options: 'i' },
        },
      ],
    };
  }
  const users = await User.find(match).select('_id code').limit(100);

  return users;
};

export default {
  list,
  create,
  update,
  listUser,
  listUserLucky,
};
