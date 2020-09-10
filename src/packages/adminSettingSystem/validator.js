import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi);

export default {
  create: {
    body: {
      iconNotificationSystem: Joi.string().label('iconNotificationSystem'),
      youtubeHistoryURL: Joi.string().label('youtubeHistoryURL'),
      loholGoodsURL: Joi.string().label('loholGoodsURL'),
      notificationSystemId: Joi.string().label('notificationSystemId'),
    },
  },

  configSystem: {
    body: {
      timeFrom: Joi.string().required().label('timeFrom'),
      timeTo: Joi.string().required().label('timeTo'),
      isOpenCloseLoveHolympic: Joi.boolean()
        .required()
        .label('isOpenCloseLoveHolympic'),
    },
  },
};
