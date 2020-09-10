import Joi from 'joi';
import { paginateValidateDefault } from '../../utils/pagination';

Joi.objectId = require('joi-objectid')(Joi);

export default {
  list: {
    query: paginateValidateDefault,
  },

  destroy: {
    body: {
      deleteFlag: Joi.boolean().required().label('deleteFlag'),
      ids: Joi.array().items(Joi.objectId().required()).label('user'),
    },
  },

  importCode: {
    body: {
      file: Joi.required().label('file'),
    },
  },
};
