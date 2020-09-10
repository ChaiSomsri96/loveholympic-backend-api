import Joi from 'joi'
import { paginateValidateDefault } from '../validator';

export default {
  validateListQuestionCategory: {
    query: paginateValidateDefault,
  },
  create: {
    body: {
      title: Joi.string().required().label('title')
    }
  }
};
