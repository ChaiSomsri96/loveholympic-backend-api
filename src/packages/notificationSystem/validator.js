import Joi from 'joi'
import { paginateValidateDefault } from '../../utils/pagination';

Joi.objectId = require('joi-objectid')(Joi);

export default {
  notificationSystemList: {
    query: paginateValidateDefault,
  },
  create: {
    body: {
      image: Joi.string().required().label('image'),
      name: Joi.string().required().label('name'),
      title: Joi.string().required().label('title'),
      // description: Joi.string().required().label('description'),
    },
  },
  detail: {
    params: {
      id: Joi.objectId().required().label('id'),
    },
  },
  listComment: {
    query: paginateValidateDefault,
  },
};
