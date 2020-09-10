/* eslint-disable no-lone-blocks */
/* eslint-disable no-underscore-dangle */
import i18n from 'i18n';
import { Notification, User } from '../../models';
import { ObjectId } from '../../utils/mongoose';
import { initialOptions } from '../../utils/pagination';
import config from './config';
import globalConfig from '../../configs';
import { sendToAndroidDevice } from '../../services/firebase';
import { notifyApp } from '../../services/fcmConstant';

/**
 *
 * @param {*} query
 * @returns
 */
const list = async (query) => {
  const options = initialOptions(query);
  const { limit, skip, sort, page } = options;
  const match = {
    $or: [
      {
        user: ObjectId(query.userId),
        deletedAt: { $eq: null },
        status: {
          $in: [
            config.status.PENDING,
            config.status.ACCEPTED,
            config.status.FAILED,
            config.status.COUPLED,
          ],
        },
      },
      {
        userSelected: ObjectId(query.userId),
        deletedAt: { $eq: null },
        status: {
          $in: [config.status.ACCEPTED, config.status.REJECTED],
        },
      },
    ],
  };

  const [notifications, total] = await Promise.all([
    Notification.find(match)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate([
        {
          path: 'user',
          ref: 'User',
          select: {
            _id: 1,
            nickname: 1,
            defaultAvatar: 1,
          },
        },
        {
          path: 'userSelected',
          ref: 'User',
          select: {
            _id: 1,
            nickname: 1,
            defaultAvatar: 1,
          },
        },
      ]),
    Notification.countDocuments(match),
  ]);

  notifications.map((notify) => {
    const { status, userSelected, user } = notify;

    if (
      status === config.status.ACCEPTED &&
      query.userId.toString() === userSelected._id.toString()
    ) {
      notify.name = user.nickname ? user.nickname : '';
      notify.message = '님께서 당신을 선택 하셨습니다';
    }

    if (
      status === config.status.REJECTED &&
      query.userId.toString() === userSelected._id.toString()
    ) {
      notify.name = user.nickname ? user.nickname : '';
      notify.message = '님께서 당신을 패스하셨습니다';
    }

    return notify;
  });

  return {
    results: notifications,
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
const detail = async (id) => {
  const match = {
    deletedAt: { $eq: null },
    _id: ObjectId(id),
  };

  const notification = await Notification.findOne(match).populate([
    {
      path: 'user',
      ref: 'User',
      select: {
        _id: 1,
        nickname: 1,
        defaultAvatar: 1,
        avatars: 1,
      },
      populate: {
        path: 'avatars',
        ref: 'Image',
      },
    },
    {
      path: 'userSelected',
      ref: 'User',
      select: {
        _id: 1,
        nickname: 1,
        defaultAvatar: 1,
        avatars: 1,
      },
      populate: {
        path: 'avatars',
        ref: 'Image',
      },
    },
  ]);

  return notification;
};

/**
 *
 * @param {*} id
 * @returns
 */
const accepted = async ({ id, userId }) => {
  const notification = await Notification.findById(ObjectId(id)).populate([
    {
      path: 'user',
      ref: 'User',
      select: {
        _id: 1,
        nickname: 1,
        defaultAvatar: 1,
        device: 1,
        deviceToken: 1,
      },
    },
    {
      path: 'userSelected',
      ref: 'User',
      select: {
        _id: 1,
        nickname: 1,
        defaultAvatar: 1,
        device: 1,
        deviceToken: 1,
      },
    },
  ]);

  if (!notification) {
    throw new Error(JSON.stringify({
      message: i18n.__('notification.notFound'),
    }));
  }

  if (userId.toString() !== notification.user._id.toString()) {
    throw new Error(JSON.stringify({
      message: i18n.__('user.notPermission'),
    }));
  }

  notification.status = config.status.ACCEPTED;
  await Promise.all([
    notification.save(),
    Notification.updateMany(
      {
        user: ObjectId(userId),
        deletedAt: { $eq: null },
        _id: { $ne: ObjectId(id) },
        status: config.status.PENDING,
      },
      {
        status: config.status.REJECTED,
        name: notification.user.nickname ? notification.user.nickname : '',
        message: notification.user.nickname
          ? '님께서 당신을 패스하셨습니다'
          : '당신을 패스한 사람이 생겼습니다.',
      },
      { multi: true },
    ),
  ]);

  // push FCM
  const message = notification.user.nickname
    ? `${notification.user.nickname}님께서 당신을 선택 하셨습니다`
    : '당신을 선택한 사람이 생겼습니다.';

  sendToAndroidDevice(
    notification.userSelected.deviceToken,
    globalConfig.APP_NAME,
    message,
    null,
    `${notifyApp.acceptedRealHolympic.name}`,
  );

  const listDeletedNotify = await Notification.find({
    deletedAt: { $ne: null },
  }).populate({
    path: 'userSelected',
    ref: 'User',
    select: {
      _id: 1,
      deviceToken: 1,
    },
  });

  const pushFCMMulti = listDeletedNotify.map(x => x.userSelected.deviceToken);
  const messageReject = notification.user.nickname
    ? `${notification.user.nickname}님께서 당신을 패스하셨습니다`
    : '당신을 패스한 사람이 생겼습니다. ';

  sendToAndroidDevice(
    pushFCMMulti,
    globalConfig.APP_NAME,
    messageReject,
    null,
    notifyApp.rejectedRealHolympic.name,
  );

  return notification;
};

/**
 *
 * @param {*} id
 * @returns
 */
const rejected = async ({ id, userId }) => {
  const notification = await Notification.findById(ObjectId(id)).populate([
    {
      path: 'user',
      ref: 'User',
      select: {
        _id: 1,
        nickname: 1,
        defaultAvatar: 1,
      },
    },
    {
      path: 'userSelected',
      ref: 'User',
      select: {
        _id: 1,
        nickname: 1,
        defaultAvatar: 1,
      },
    },
  ]);

  if (!notification) {
    throw new Error(JSON.stringify({
      message: i18n.__('notification.notFound'),
    }));
  }

  if (userId.toString() !== notification.user._id.toString()) {
    throw new Error(JSON.stringify({
      message: i18n.__('user.notPermission'),
    }));
  }

  notification.status = config.status.REJECTED;
  notification.name = notification.user.nickname
    ? notification.user.nickname
    : '';
  notification.message = notification.user.nickname
    ? '님께서 당신을 패스하셨습니다'
    : '당신을 패스한 사람이 생겼습니다.';
  await notification.save();
  // push FCM
  const message = notification.user.nickname
    ? `${notification.user.nickname}님께서 당신을 패스하셨습니다`
    : '당신을 패스한 사람이 생겼습니다.';

  sendToAndroidDevice(
    notification.userSelected.deviceToken,
    globalConfig.APP_NAME,
    message,
    null,
    `${notifyApp.rejectedRealHolympic.name}`,
  );

  return notification;
};

/**
 *
 * @param {*} body
 */
const chatSharePhone = async (body) => {
  const { phone, userChatId, userId } = body;
  const notification = await Notification.findOne({
    status: config.status.ACCEPTED,
    $or: [
      {
        user: ObjectId(userId),
        userSelected: ObjectId(userChatId),
      },
      {
        user: ObjectId(userChatId),
        userSelected: ObjectId(userId),
      },
    ],
  });

  if (!notification) {
    throw new Error(JSON.stringify({
      message: i18n.__('notification.notFound'),
    }));
  }

  let dataUpdate = {};

  if (userId.toString() === notification.user.toString()) {
    dataUpdate = {
      phoneUser: phone,
    };
  }
  if (userId.toString() === notification.userSelected.toString()) {
    dataUpdate = {
      phoneUserSelected: phone,
    };
  }

  const users = await User.find({
    $or: [
      {
        _id: ObjectId(userId),
      },
      {
        _id: ObjectId(userChatId),
      },
    ],
  });
  const [userObj, userChatObj] = await Promise.all([
    User.findById(userId),
    User.findById(userChatId),
  ]);

  if (!notification.rejectUserPhone && !notification.rejectUserSelectedPhone) {
    if (notification.phoneUser || notification.phoneUserSelected) {
      const createData = [
        {
          ...dataUpdate,
          status: config.status.COUPLED,
          user: ObjectId(userId),
          userSelected: ObjectId(userChatId),
          name: userChatObj.nickname ? userChatObj.nickname : '',
          message: userChatObj.nickname
            ? '님의 연락처를 받았습니다'
            : '연락처를 주고받고 싶은 사람이 생겼습니다',
        },
        {
          ...dataUpdate,
          status: config.status.COUPLED,
          user: ObjectId(userChatId),
          userSelected: ObjectId(userId),
          name: userObj.nickname ? userObj.nickname : '',
          message: userObj.nickname
            ? '님의 연락처를 받았습니다'
            : '연락처를 주고받고 싶은 사람이 생겼습니다',
        },
      ];
      await Notification.insertMany(createData);

      // push FCM
      const message = users[0].nickname
        ? `${users[0].nickname}님의 연락처를 받았습니다`
        : '연락처를 주고받고 싶은 사람이 생겼습니다';
      sendToAndroidDevice(
        users[1].deviceToken,
        globalConfig.APP_NAME,
        message,
        notification._id.toString(),
        notifyApp.acceptedSharePhoneRealHolympic.name,
      );

      const message2 = users[1].nickname
        ? `${users[1].nickname}님의 연락처를 받았습니다`
        : '연락처를 주고받고 싶은 사람이 생겼습니다';
      sendToAndroidDevice(
        users[0].deviceToken,
        globalConfig.APP_NAME,
        message2,
        notification._id.toString(),
        notifyApp.acceptedSharePhoneRealHolympic.name,
      );
    }
  } else {
    const createData = [
      {
        status: config.status.FAILED,
        user: ObjectId(userId),
        userSelected: ObjectId(userChatId),
        name: userChatObj.nickname ? userChatObj.nickname : '',
        message: '연락처 주고받기가 실패하였습니다.',
      },
      {
        status: config.status.FAILED,
        user: ObjectId(userChatId),
        userSelected: ObjectId(userId),
        name: userObj.nickname ? userObj.nickname : '',
        message: '연락처 주고받기가 실패하였습니다.',
      },
    ];
    await Notification.insertMany(createData);

    sendToAndroidDevice(
      users[1].deviceToken,
      globalConfig.APP_NAME,
      '채팅이 실패하였습니다.',
      null,
      notifyApp.rejectedSharePhoneRealHolympic.name,
    );

    sendToAndroidDevice(
      users[0].deviceToken,
      globalConfig.APP_NAME,
      '채팅이 실패하였습니다. ',
      null,
      notifyApp.rejectedSharePhoneRealHolympic.name,
    );
  }

  await Notification.updateOne({ _id: notification._id }, dataUpdate);

  return notification;
};

/**
 *
 * @param {*} body
 * @returns
 */
const chatRejectPhone = async (body) => {
  const { userChatId, userId } = body;
  const notification = await Notification.findOne({
    status: config.status.ACCEPTED,
    $or: [
      {
        user: ObjectId(userId),
        userSelected: ObjectId(userChatId),
      },
      {
        user: ObjectId(userChatId),
        userSelected: ObjectId(userId),
      },
    ],
  });

  if (!notification) {
    throw new Error(JSON.stringify({
      message: i18n.__('notification.notFound'),
    }));
  }

  if (
    !!notification.rejectUserPhone ||
    !!notification.rejectUserSelectedPhone
  ) {
    const [userObj, userChatObj] = await Promise.all([
      User.findById(userId),
      User.findById(userChatId),
    ]);

    const createData = [
      {
        status: config.status.FAILED,
        user: ObjectId(userId),
        userSelected: ObjectId(userChatId),
        name: userChatObj.nickname ? userChatObj.nickname : '',
        message: '연락처 주고받기가 실패하였습니다.',
      },
      {
        status: config.status.FAILED,
        user: ObjectId(userChatId),
        userSelected: ObjectId(userId),
        name: userObj.nickname ? userObj.nickname : '',
        message: '연락처 주고받기가 실패하였습니다.',
      },
    ];
    await Notification.insertMany(createData);

    // push FCM
    const users = await User.find({
      $or: [
        {
          _id: ObjectId(userId),
        },
        {
          _id: ObjectId(userChatId),
        },
      ],
    });
    const message = users[0].nickname
      ? `${users[0].nickname}님께서 당신의 연락처를 패스하셨습니다.`
      : '당신의 연락처를 패스한 사람이 생겼습니다.';
    sendToAndroidDevice(
      users[1].deviceToken,
      globalConfig.APP_NAME,
      message,
      null,
      notifyApp.rejectedSharePhoneRealHolympic.name,
    );

    const message2 = users[1].nickname
      ? `${users[1].nickname}님께서 당신의 연락처를 패스하셨습니다.`
      : '당신의 연락처를 패스한 사람이 생겼습니다.';
    sendToAndroidDevice(
      users[0].deviceToken,
      globalConfig.APP_NAME,
      message2,
      null,
      notifyApp.rejectedSharePhoneRealHolympic.name,
    );
  }

  return notification;
};

export default {
  list,
  accepted,
  rejected,
  chatSharePhone,
  chatRejectPhone,
  detail,
};
