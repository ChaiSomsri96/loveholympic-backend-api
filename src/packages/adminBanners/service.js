/* eslint-disable prefer-destructuring */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import i18n from 'i18n';
import { Banner, SettingSystem } from '../../models';
import { ObjectId } from '../../utils/mongoose';
import { initialOptions } from '../../utils/pagination';

/**
 *
 * @param {*} query
 * @returns
 */
const list = async (query) => {
  const options = initialOptions(query);
  const { limit, skip, sort, page, sortBy, sortType } = options;
  const match = {
    deletedAt: { $eq: null },
  };
  const [banners, total] = await Promise.all([
    Banner.find(match).sort(sort).skip(skip).limit(limit),
    Banner.countDocuments(match),
  ]);

  let loholGoodsURL = '';
  const settingSys = await SettingSystem.findOne();
  if (settingSys && settingSys.setting && settingSys.setting.loholGoodsURL) {
    loholGoodsURL = settingSys.setting.loholGoodsURL;
  }

  return {
    results: banners,
    total,
    page,
    limit,
    sortBy,
    sortType,
    loholGoodsURL,
  };
};

/**
 *
 * @param {*} query
 * @returns
 */
const detail = async ({ id }) => {
  const banner = await Banner.findById(ObjectId(id));

  return banner;
};

/**
 *
 * @param {*} body
 * @returns
 */
const create = async (body) => {
  const banner = await Banner.create(body);

  return banner;
};

/**
 *
 * @param {*} body
 * @returns
 */
const createImageManage = async (body) => {
  const ids = body.images.filter(item => item._id).map(k => k._id);

  for (let i = 0; i < body.images.length; i++) {
    const banner = body.images[i];
    if (banner._id) {
      await Banner.findOneAndUpdate(
        {
          _id: ObjectId(banner._id),
        },
        banner,
        { new: true },
      );
    } else {
      await Banner.create(banner);
    }
  }

  if (body.idsDel) {
    for (let j = 0; j < body.idsDel.length; j++) {
      const b = body.idsDel[j];
      if (!ids.includes(b)) {
        await Banner.remove({ _id: ObjectId(b) });
      }
    }
  }

  if (body.loholGoodsURL) {
    let setting = await SettingSystem.findOne();
    if (setting) {
      setting = await SettingSystem.findOneAndUpdate(
        {
          _id: (await setting)._id,
        },
        {
          setting: {
            ...setting.setting,
            loholGoodsURL: body.loholGoodsURL,
          },
        },
      );
    } else {
      setting = await SettingSystem.create({
        setting: {
          loholGoodsURL: body.loholGoodsURL,
        },
      });
    }
  }

  const data = await Banner.find({ isActive: true });

  return data;
};

/**
 *
 * @param {*} body
 * @returns
 */
const edit = async (body) => {
  const { bannerId } = body;
  const [banner] = await Promise.all([Banner.findById(ObjectId(bannerId))]);

  if (!banner) {
    throw new Error(JSON.stringify({
      message: i18n.__('banner.notFound'),
    }));
  }

  const newNanner = await Banner.findOneAndUpdate(
    { _id: ObjectId(bannerId) },
    body,
    { new: true },
  );

  return newNanner;
};

/**
 *
 * @param {*} body
 * @returns
 */
const destroy = async (body) => {
  const { id } = body;
  const banner = await Banner.findById(id);

  if (!banner) {
    throw new Error(JSON.stringify({
      message: i18n.__('banners.notFound'),
    }));
  }

  await Banner.remove({ _id: id });

  return { message: 'success' };
};

export default {
  list,
  create,
  destroy,
  detail,
  edit,
  createImageManage,
};
