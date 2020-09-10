import Joi from 'joi'
import { paginateValidateDefault } from '../../utils/pagination';

Joi.objectId = require('joi-objectid')(Joi);

export default {
  commentList: {
    query: paginateValidateDefault,
  },
  createComment: {
    body: {
      notificationSystem: Joi.objectId().required().label('notificationSystem'),
      content: Joi.string().required().label('content')
    }
  }
};
