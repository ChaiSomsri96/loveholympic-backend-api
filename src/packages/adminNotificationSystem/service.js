/* eslint-disable no-underscore-dangle */
import i18n from 'i18n';
import { initialOptions } from '../../utils/pagination';
import { NotificationSystem, SettingSystem } from '../../models';
import { ObjectId } from '../../utils/mongoose';

/**
 *
 * @param {*} query
 * @returns
 */
const list = async (query) => {
  const { search: txtSearch } = query;
  const options = initialOptions(query);
  const { limit, skip, sort, page, sortBy, sortType } = options;
  let match = {
    deletedAt: { $eq: null },
  };

  if (txtSearch) {
    match = {
      ...match,
      $or: [
        {
          name: { $regex: txtSearch, $options: 'i' },
        },
        {
          title: { $regex: txtSearch, $options: 'i' },
        },
        {
          description: { $regex: txtSearch, $options: 'i' },
        },
      ],
    };
  }

  const [notifications, total] = await Promise.all([
    NotificationSystem.find(match).sort(sort).skip(skip).limit(limit),
    NotificationSystem.countDocuments(match),
  ]);

  return {
    results: notifications,
    total,
    page,
    limit,
    sortBy,
    sortType,
  };
};

/**
 *
 * @param {*} body
 * @returns
 */
const create = async (body) => {
  const notification = await NotificationSystem.create(body);

  return notification;
};

/**
 *
 * @param {*} body
 * @returns
 */
const destroy = async (body) => {
  const { id } = body;
  const notification = await NotificationSystem.findById(id);

  if (!notification) {
    throw new Error(JSON.stringify({
      message: i18n.__('notificationSystem.notFound'),
    }));
  }

  await NotificationSystem.findByIdAndUpdate(
    { _id: id },
    { deletedAt: Date() },
    { new: true }
  );

  return { message: 'success' };
};

/**
 *
 * @param {*} body
 * @returns
 */
const detail = async (id) => {
  const notification = await NotificationSystem.findById(id);

  if (!notification) {
    throw new Error(JSON.stringify({
      message: i18n.__('notificationSystem.notFound'),
    }));
  }

  return notification;
};

/**
 *
 * @param {*} body
 * @returns
 */
const updatePriority = async (id) => {
  const notification = await NotificationSystem.findById(ObjectId(id));

  if (!notification) {
    throw new Error(JSON.stringify({
      message: i18n.__('notificationSystem.notFound'),
    }));
  }

  notification.order = 1;
  await Promise.all([
    notification.save(),
    NotificationSystem.updateMany({
      _id: { $ne: notification._id }
    }, { order: null }),
  ]);

  return notification;
};

/**
 *
 * @param {*} body
 * @returns
 */
const update = async (id, body) => {
  const setting = await SettingSystem.findOne();
  if (!setting) {
    throw new Error(JSON.stringify({
      message: i18n.__('settingSystem.notFound'),
    }));
  }

  const { iconNotificationSystem } = setting.setting;

  if (!iconNotificationSystem) {
    throw new Error(JSON.stringify({
      message: i18n.__('settingSystem.iconSystem.notFound'),
    }));
  }

  const notification = await NotificationSystem.findOneAndUpdate(
    { _id: id },
    {
      ...body,
      icon: iconNotificationSystem,
    },
    { new: true }
  );

  return notification;
};

export default {
  list,
  create,
  destroy,
  update,
  detail,
  updatePriority,
};
