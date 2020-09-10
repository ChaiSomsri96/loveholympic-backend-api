import Joi from 'joi';
import { paginateValidateDefault } from '../../utils/pagination';
import config from './config';

export default {
  validateAddEditBanner: {
    body: {
      imageId: Joi.objectId().required().label('imageId'),
      description: Joi.string().label('description'),
      isActive: Joi.boolean().required().label('isActive'),
      position: Joi.number().integer().label('position'),
      type: Joi.string()
        .required()
        .valid(...Object.values(config.typeBanner))
        .label('type'),
    },
  },

  validateEditBanner: {
    body: {
      image: Joi.string().required().label('image'),
      isActive: Joi.boolean().required().label('isActive'),
      position: Joi.number().integer().label('position'),
      type: Joi.string()
        .required()
        .valid(...Object.values(config.typeBanner))
        .label('type'),
    },
  },

  validateListBanner: {
    query: {
      ...paginateValidateDefault,
      type: Joi.string()
        .valid(...Object.values(config.typeBanner))
        .label('type'),
    },
  },

  createImageManage: {
    body: {
      images: Joi.array().required().label('images'),
      idsDel: Joi.array().required().label('idsDel'),
      // loholGoodsURL: Joi.string().required().label('loholGoodsURL'),
    },
  },
};
