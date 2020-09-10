/* eslint-disable no-underscore-dangle */
import i18n from 'i18n';
import config from '../../configs';
import {
  LuffingTest,
  User,
  QuestionCategory,
  Question,
  Answer,
  UserSoulTest,
} from '../../models';
import { ObjectId } from '../../utils/mongoose';
import configQuestionCategory from '../questionCategory/config';

/**
 *
 * @param {*} query
 * @returns
 */
const updateQuestionAnswer = async (body) => {
  const { user, question, answer, questionCategory } = body;
  const userObj = await User.findById(ObjectId(user));

  if (userObj.isFinishSoulTest) {
    throw new Error(JSON.stringify({
      message: i18n.__('user.AlreadyFinishSoulTest'),
    }));
  }

  const [questionCategoryObj, questionObj, answerObj] = await Promise.all([
    QuestionCategory.findById(ObjectId(questionCategory)),
    Question.findOne({
      _id: ObjectId(question),
      questionCategory: ObjectId(questionCategory),
    }).lean(),
    Answer.findOne({
      _id: ObjectId(answer),
      question: ObjectId(question),
    }),
  ]);

  if (!questionCategoryObj) {
    throw new Error(JSON.stringify({
      message: i18n.__('questionCategory.notFound'),
    }));
  }

  if (!questionObj) {
    throw new Error(JSON.stringify({
      message: i18n.__('question.notFound'),
    }));
  }

  if (!answerObj) {
    throw new Error(JSON.stringify({
      message: i18n.__('answer.notFound'),
    }));
  }

  let soulTest = await LuffingTest.findOne({
    question: new ObjectId(question),
    user: new ObjectId(user),
    questionCategory: new ObjectId(questionCategory),
    type: questionCategoryObj.category,
  });

  if (soulTest) {
    throw new Error(JSON.stringify({
      message: i18n.__('user.questionAlreadyAnswered'),
    }));
  }

  soulTest = await LuffingTest.create({
    ...body,
    type: questionCategoryObj.category,
  });

  let userSoulTest = await UserSoulTest.findOne({
    user: ObjectId(user),
  });
  console.log({ userSoulTest });

  if (!userSoulTest) {
    let createData = {};

    switch (questionCategoryObj.type) {
      case config.soulTestType.TEMPARATURE_LOVE:
        createData = {
          temparatureLove: parseFloat(answerObj.point).toFixed(1),
        };
        break;
      case config.soulTestType.POINT_OF_LOVE:
        createData = {
          opinionOfLove: parseFloat(answerObj.point).toFixed(1),
        };
        break;
      case config.soulTestType.RELATIONSHIPS:
        createData = {
          relationships: parseFloat(answerObj.point).toFixed(1),
        };
        break;
      case config.soulTestType.DATING:
        createData = {
          dating: parseFloat(answerObj.point).toFixed(1),
        };
        break;
      case config.soulTestType.SHOW_AFFECTION:
        createData = {
          showAffection: parseFloat(answerObj.point).toFixed(1),
        };
        break;
      default:
        break;
    }

    userSoulTest = await UserSoulTest.create({
      ...createData,
      user: ObjectId(user),
    });
  } else {
    switch (questionCategoryObj.type) {
      case config.soulTestType.TEMPARATURE_LOVE:
        userSoulTest.temparatureLove = parseFloat(userSoulTest.temparatureLove + answerObj.point).toFixed(1);
        break;
      case config.soulTestType.POINT_OF_LOVE:
        userSoulTest.opinionOfLove = parseFloat(userSoulTest.opinionOfLove + answerObj.point).toFixed(1);
        break;
      case config.soulTestType.RELATIONSHIPS:
        userSoulTest.relationships = parseFloat(userSoulTest.relationships + answerObj.point).toFixed(1);
        break;
      case config.soulTestType.DATING:
        userSoulTest.dating = parseFloat(userSoulTest.dating + answerObj.point).toFixed(1);
        break;
      case config.soulTestType.SHOW_AFFECTION:
        userSoulTest.showAffection = parseFloat(userSoulTest.showAffection + answerObj.point).toFixed(1);
        break;
      default:
        break;
    }
  }

  await userSoulTest.save();

  return {
    ...questionObj,
    answerSelected: answerObj._id,
  };
};

/**
 *
 * @param {*} userObj
 * @returns
 */
const _checkSettingLineMyProfile = async (userObj) => {
  const { gender, age, area, hobbies, personalities } = userObj;

  return !!gender && !!age && !!area && !!hobbies && !!personalities;
};

/**
 *
 * @param {*} userId
 */
const _checkFinishSoulTest = async (userId) => {
  const userSoulTest = await UserSoulTest.findOne({
    user: userId,
  });

  if (!userSoulTest) {
    return false;
  }

  const {
    temparatureLove,
    opinionOfLove,
    relationships,
    dating,
    showAffection,
  } = userSoulTest;

  return (
    !!temparatureLove &&
    !!opinionOfLove &&
    !!relationships &&
    !!dating &&
    !!showAffection
  );
};

/**
 *
 * @param {*} userId
 * @returns
 */
const detail = async (userId) => {
  const userSoulTest = await UserSoulTest.findOne({
    user: userId,
  }).populate({
    path: 'user',
    ref: 'User',
    select: '_id isFinishSoulTest',
  });

  if (!userSoulTest) {
    throw new Error(JSON.stringify({
      message: i18n.__('userSoulTest.notFound'),
    }));
  }

  return userSoulTest;
};

/**
 *
 * @param {*} userId
 * @returns
 */
const doneSoulTest = async (userId) => {
  const isDoneSoulTest = await _checkFinishSoulTest(ObjectId(userId));

  if (!isDoneSoulTest) {
    throw new Error(JSON.stringify({
      message: i18n.__('user.notFinishSoulTest'),
    }));
  }

  await User.findOneAndUpdate(
    {
      _id: ObjectId(userId),
    },
    {
      isFinishSoulTest: true,
    },
    { new: true }
  );

  const userSoulTest = await UserSoulTest.findOne({
    user: ObjectId(userId),
  }).populate({
    path: 'user',
    ref: 'User',
    select: '_id isFinishSoulTest',
  });

  return userSoulTest;
};

/**
 *
 * @returns
 */
const getListAnswerSoulTest = async (userId) => {
  const ids = await LuffingTest.find({
    user: ObjectId(userId),
    type: configQuestionCategory.category.SOUL_TEST,
  }).select('_id answer');

  return { soulTest: ids.map(item => item.answer) };
};

/**
 *
 * @param {*} userId
 * @returns
 */
const resetSoulTest = async (userId) => {
  if (!process.env.NODE_ENV !== 'production') {
    await Promise.all([
      LuffingTest.remove({
        user: ObjectId(userId),
        type: configQuestionCategory.category.SOUL_TEST,
      }),
      UserSoulTest.remove({
        user: ObjectId(userId),
      }),
      User.findOneAndUpdate(
        { _id: ObjectId(userId) },
        { isFinishSoulTest: false },
        { new: true }
      ),
    ]);
  }

  return null;
};

export default {
  updateQuestionAnswer,
  doneSoulTest,
  getListAnswerSoulTest,
  resetSoulTest,
  detail,
  _checkSettingLineMyProfile,
  _checkFinishSoulTest,
};
