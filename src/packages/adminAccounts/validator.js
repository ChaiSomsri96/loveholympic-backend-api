import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi);

export default {
  createAccount: {
    body: {
      username: Joi.string().label('username'),
      password: Joi.string().label('password'),
    },
  },

  login: {
    body: {
      username: Joi.string().required().label('username'),
      password: Joi.string().required().label('password'),
    },
  },

  updateProfile: {
    body: {
      name: Joi.string().label('name'),
      avatar: Joi.string().required().label('avatar'),
    },
  },

  updatePassword: {
    body: {
      passwordCurrent: Joi.string()
        .min(6)
        .max(20)
        .required()
        .label('current password'),
      password: Joi.string().min(6).max(20).required().label('password'),
      passwordConfirmation: Joi.any()
        .valid(Joi.ref('password'))
        .required()
        .options({ language: { any: { allowOnly: 'must match password' } } }),
    },
  },
};
