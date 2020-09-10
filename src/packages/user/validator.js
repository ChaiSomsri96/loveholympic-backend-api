import Joi from 'joi';
import config from './config';

Joi.objectId = require('joi-objectid')(Joi);

export default {
  register: {
    body: {
      accessToken: Joi.string().required().label('accessToken'),
      socialType: Joi.string()
        .required()
        .valid(...Object.values(config.socialType))
        .label('socialType'),
      code: Joi.string().label('code'),
      device: Joi.string()
        .required()
        .valid(...Object.values(config.devideType))
        .label('device'),
      deviceToken: Joi.string().required().label('deviceToken'),
      type: Joi.string()
        .valid(...Object.values(config.type))
        .label('type'),

      // login by apple
      name: Joi.string().label('name'),
      email: Joi.string().label('email'),
      appleId: Joi.string().label('appleId'),
    },
  },

  verifyCode: {
    body: {
      code: Joi.string().required().label('code'),
    },
  },

  login: {
    body: {
      socialType: Joi.string()
        .required()
        .valid(...Object.values(config.socialType))
        .label('socialType'),
      accessToken: Joi.string().required().label('accessToken'),
      device: Joi.string()
        .required()
        .valid(...Object.values(config.devideType))
        .label('device'),
      deviceToken: Joi.string().required().label('deviceToken'),

      // login by apple
      name: Joi.string().label('name'),
      email: Joi.string().label('email'),
      appleId: Joi.string().label('appleId'),
    },
  },

  updateProfile: {
    body: {
      avatars: Joi.array()
        .required()
        .items(Joi.objectId().required())
        .label('avatars'),
      description: Joi.string().required().label('description'),
    },
  },

  updatePhone: {
    body: {
      phoneNumber: Joi.string().required().label('phoneNumber'),
    },
  },

  settingLineProfile: {
    body: {
      gender: Joi.string()
        .required()
        .valid(...Object.values(config.sex))
        .label('gender'),
      age: Joi.number().integer().required().label('age'),
      area: Joi.objectId().required().label('area'),
      hobbies: Joi.string().required().label('hobbies'),
      personalities: Joi.string().required().label('personalities'),
    },
  },

  loginByEmail: {
    body: {
      email: Joi.string().email().required().label('email'),
    },
  },

  likeAndUnlike: {
    body: {
      userId: Joi.objectId().required(),
      like: Joi.boolean().required(),
    },
  },
};
