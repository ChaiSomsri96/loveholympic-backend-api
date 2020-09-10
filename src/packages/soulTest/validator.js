import Joi from 'joi';

export default {
  updateQuestionAnswer: {
    body: {
      question: Joi.objectId().required().label('question'),
      answer: Joi.objectId().required().label('answer'),
      questionCategory: Joi.objectId().required().label('questionCategory'),
      // point: Joi.number().required().label('point'),
    },
  },
};
