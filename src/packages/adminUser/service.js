/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import i18n from 'i18n';
import { v4 as uuidv4 } from 'uuid';
import readXlsxFile from 'read-excel-file/node';
import { customAlphabet } from 'nanoid';
import { User, UserHolympic, Hobby, Personality, Area } from '../../models';
import { ObjectId } from '../../utils/mongoose';
import { initialOptions } from '../../utils/pagination';

/**
 *
 * @param {*} condition
 * @param {*} query
 * @returns
 */
const _repoGetListUser = async (condition, query) => {
  const options = initialOptions(query);
  const { limit, skip, sort, page } = options;

  const [users, total] = await Promise.all([
    User.find(condition).sort(sort).skip(skip).limit(limit),
    User.countDocuments(condition),
  ]);

  return {
    results: users,
    total,
    page,
    limit,
  };
};

/**
 *
 * @param {*} query
 * @returns
 */
const list = async (query) => {
  const { search: txtSearch, statusSms } = query;
  let match = {
    // code: { $exists: true },
    deletedAt: { $eq: null },
  };

  if (txtSearch) {
    match = {
      ...match,
      $or: [
        {
          nickname: { $regex: txtSearch, $options: 'i' },
        },
        {
          code: { $regex: txtSearch, $options: 'i' },
        },
        {
          phone: { $regex: txtSearch, $options: 'i' },
        },
        {
          userID: { $regex: txtSearch, $options: 'i' },
        },
      ],
    };
  }

  if (statusSms && statusSms === 'success') {
    match = {
      ...match,
      isSendSMS: true,
      isSendSmsSuccess: true,
    };
  }

  if (statusSms && statusSms === 'error') {
    match = {
      ...match,
      $or: [
        {
          isSendSMS: false,
        },
        {
          isSendSMS: true,
          isSendSmsSuccess: false,
        },
      ],
    };
  }

  return _repoGetListUser(match, query);
};

/**
 *
 * @param {*} query
 * @returns
 */
const userDetail = async ({ id }) => {
  const user = await User.findById(ObjectId(id))
    .populate({
      path: 'avatars',
      ref: 'Image',
    })
    .populate({
      path: 'area',
      ref: 'Area',
    })
    .populate({
      path: 'userCouple',
      ref: 'User',
    })
    .lean();

  const { hobbies, personalities } = user;
  const listHobby = hobbies ? hobbies.split(',') : [];
  const hobbiesArr = [];
  for (let i = 0; i < listHobby.length; i++) {
    const hobbyID = listHobby[i];
    const h = await Hobby.findById(ObjectId(hobbyID));
    hobbiesArr.push(h);
  }

  const listPersonal = personalities ? personalities.split(',') : [];
  const personalitiesArr = [];
  for (let i = 0; i < listPersonal.length; i++) {
    const hobbyID = listPersonal[i];
    const h = await Personality.findById(ObjectId(hobbyID));
    personalitiesArr.push(h);
  }

  const userHolympic = await UserHolympic.findOne({
    user: ObjectId(user._id),
  }).lean();

  if (userHolympic) {
    const listHobbyHolympic = userHolympic.hobbies
      ? userHolympic.hobbies.split(',')
      : [];
    const hobbiesArrHol = [];
    for (let i = 0; i < listHobbyHolympic.length; i++) {
      const hobbyID = listHobbyHolympic[i];
      const h = await Hobby.findById(ObjectId(hobbyID));
      hobbiesArrHol.push(h);
    }

    const listPersonalitiesHolympic = userHolympic.personalities
      ? userHolympic.personalities.split(',')
      : [];
    const personalitiesArrHol = [];
    for (let i = 0; i < listPersonalitiesHolympic.length; i++) {
      const hobbyID = listPersonalitiesHolympic[i];
      const h = await Personality.findById(ObjectId(hobbyID));
      personalitiesArrHol.push(h);
    }

    const listAreaHolympic = userHolympic.area
      ? userHolympic.area.split(',')
      : [];
    const areaArrHol = [];
    for (let i = 0; i < listAreaHolympic.length; i++) {
      const hobbyID = listAreaHolympic[i];
      const h = await Area.findById(ObjectId(hobbyID));
      areaArrHol.push(h);
    }

    return {
      ...user,
      userHolympic: {
        ...userHolympic,
        hobbies: hobbiesArrHol,
        personalities: personalitiesArrHol,
        area: areaArrHol,
      },
      hobbies: hobbiesArr,
      personalities: personalitiesArr,
    };
  } else {
    return {
      ...user,
      userHolympic: null,
      hobbies: hobbiesArr,
      personalities: personalitiesArr,
    };
  }
};

/**
 *
 * @param {*} query
 * @returns
 */
const getUserManagement = async (query) => {
  const { search: txtSearch, gender } = query;
  let match = {
    deletedAt: { $eq: null },
  };

  if (txtSearch) {
    match = {
      ...match,
      $or: [
        {
          nickname: { $regex: txtSearch, $options: 'i' },
        },
        {
          code: { $regex: txtSearch, $options: 'i' },
        },
        {
          email: { $regex: txtSearch, $options: 'i' },
        },
        {
          phone: { $regex: txtSearch, $options: 'i' },
        },
        // {
        //   _id: { $regex: txtSearch, $options: 'i' },
        // },
      ],
    };
  }

  if (gender) {
    match = {
      ...match,
      gender,
    }
  }

  if (query.type) {
    match = {
      ...match,
      type: query.type,
    }
  }

  if (query.ranking) {
    match = {
      ...match,
      sort: { ranking: Number(query.ranking) },
    };
  }

  if (query.totalHeart) {
    match = {
      ...match,
      sort: { totalHeart: Number(query.totalHeart) },
    };
  }

  if (query.luffingTest) {
    // do something
  }

  if (query.isGoldenTicket) {
    match = {
      ...match,
      isGoldenTicket: query.isGoldenTicket,
    };
  }

  if (query.rankingFrom && query.rankingTo) {
    match = {
      ...match,
      ranking: {
        $gte: parseInt(query.rankingFrom, 10),
        $lte: parseInt(query.rankingTo, 10),
      },
    };
  }

  if (!query.rankingFrom && query.rankingTo) {
    match = {
      ...match,
      ranking: {
        $gte: 1,
        $lte: parseInt(query.rankingTo, 10),
      },
    };
  }

  if (query.rankingFrom && !query.rankingTo) {
    match = {
      ...match,
      ranking: query.rankingFrom,
    };
  }

  return _repoGetListUser(match, query);
};

/**
 *
 * @param {*} body
 */
const destroy = async (body) => {
  const { deleteFlag, ids } = body;

  if (deleteFlag) {
    await User.updateMany(
      {
        deletedAt: { $eq: null },
      },
      {
        deletedAt: new Date(),
      },
    );

    return {
      message: 'success',
    };
  }

  if (ids && ids.length) {
    await Promise.all(ids.map(u =>
      User.findOneAndUpdate(
        { _id: ObjectId(u) },
        { deletedAt: new Date() },
        { new: true }
      )));
  }

  return {
    message: 'success',
  };
};

/**
 *
 * @param {*} req
 * @returns
 */
const importCode = async (req) => {
  const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 6);

  if (req.file === undefined) {
    throw new Error(JSON.stringify({
      message: i18n.__('Please upload an excel file!'),
    }));
  }

  const { size, path: filePath } = req.file;

  // > 2Mb
  if (size / (1024 * 1024) > 10) {
    throw new Error(JSON.stringify({
      message: i18n.__('file.fileMax2Mb'),
    }));
  }
  const rows = await readXlsxFile(filePath);
  rows.shift();

  const userCodes = [];
  rows.forEach((row) => {
    const userCode = {
      nickname: row[0],
      phone: row[1],
      code: nanoid(),
      userID: uuidv4(),
    };

    userCodes.push(userCode);
  });

  userCodes.shift();
  const data = await User.insertMany(userCodes);

  return data;
};

export default {
  list,
  destroy,
  importCode,
  getUserManagement,
  userDetail,
};
