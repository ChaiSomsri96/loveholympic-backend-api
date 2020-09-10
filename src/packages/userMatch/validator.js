import Joi from 'joi';
import config from './config';

export default {
  nextMatchRound: {
    body: {
      match: Joi.number()
        .integer()
        .required()
        .valid(...Object.values(config.noMatch))
        .label('match'),
      round: Joi.number().integer().required().label('round'),
      userSelectedId: Joi.objectId().required().label('userSelectedId'),
    },
  },

  finalRound: {
    body: {
      userSelectedId: Joi.objectId().required().label('userSelectedId'),
    },
  },
};
