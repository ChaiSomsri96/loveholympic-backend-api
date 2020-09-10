import Joi from 'joi';
import configGlobal from '../../configs';
import configUser from '../user/config';

Joi.objectId = require('joi-objectid')(Joi);

export default {
  create: {
    body: {
      type: Joi.string()
        .required()
        .valid(...Object.values(configGlobal.typeHolympic))
        .label('type'),
      gender: Joi.string()
        .required()
        .valid(...Object.values(configUser.sex))
        .label('gender'),
      age: Joi.string().required().label('age'),
      area: Joi.required().label('area'),
      hobbies: Joi.string().required().label('hobbies'),
      personalities: Joi.string().required().label('personalities'),
    },
  },

  verify: {
    query: {
      type: Joi.string()
        .required()
        .valid(...Object.values(configGlobal.typeHolympic))
        .label('type'),
    },
  },
};
