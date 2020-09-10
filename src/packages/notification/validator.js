import Joi from 'joi';
import { paginateValidateDefault } from '../../utils/pagination';

Joi.objectId = require('joi-objectid')(Joi);

export default {
  list: {
    query: paginateValidateDefault,
  },

  sharePhone: {
    body: {
      userChatId: Joi.objectId().required().label('userChatId'),
      phone: Joi.string().required().label('phone'),
    },
  },

  rejectPhone: {
    body: {
      userChatId: Joi.objectId().required().label('userChatId'),
    },
  },
};
