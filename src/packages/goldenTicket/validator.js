import Joi from 'joi';
import { paginateValidateDefault } from '../../utils/pagination';

Joi.objectId = require('joi-objectid')(Joi);

export default {
  list: {
    query: paginateValidateDefault,
  },

  create: {
    body: {
      timeFrom: Joi.string().required().label('timeFrom'),
      timeTo: Joi.string().required().label('timeTo'),
      imageGlobal: Joi.string().required().label('imageGlobal'),
      tickets: Joi.array().required().label('tickets'),
      // imageLucky: Joi.objectId().required().label('imageLucky'),
      // random: Joi.number().integer().label('random'),
      // users: Joi.array().items(Joi.objectId().required()).label('users'),
    },
  },

  update: {
    body: {
      image: Joi.string().label('imageId'),
      maxUser: Joi.number().integer().label('maxUser'),
      minUser: Joi.number().integer().label('minUser'),
      isActive: Joi.boolean().label('isActive'),
      imageLucky: Joi.string().label('imageLucky'),
      userLuckiesDefault: Joi.objectId().label('userLuckiesDefault'),
    },
  },
};
