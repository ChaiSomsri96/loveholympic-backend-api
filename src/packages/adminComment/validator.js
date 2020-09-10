import Joi from 'joi'
import { paginateValidateDefault } from '../../utils/pagination';

Joi.objectId = require('joi-objectid')(Joi);

export default {
  validateCreate: {
    body: {
      comment: Joi.string().required().label('comment'),
      content: Joi.string().required().label('content'),
    },
  },

  list: {
    query: paginateValidateDefault,
  },

  replyComment: {
    body: {
      content: Joi.string().required().label('content'),
      notificationId: Joi.objectId().required().label('notificationId'),
      commentId: Joi.objectId().required().label('commentId'),
    },
  },
};
