import Joi from 'joi'
import { paginateValidateDefault } from '../../utils/pagination';

Joi.objectId = require('joi-objectid')(Joi);

export default {
  listReport: {
    query: paginateValidateDefault,
  },
  create: {
    body: {
      userId: Joi.objectId().required().label('userId'),
      reporterId: Joi.objectId().required().label('reporterId'),
    },
  },
  update: {
    body: {
      userId: Joi.string().required().label('userId'),
    },
  },
};
