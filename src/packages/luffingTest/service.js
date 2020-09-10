/* eslint-disable no-underscore-dangle */
import i18n from 'i18n';
import config from '../../configs';
import {
  LuffingTest,
  User,
  QuestionCategory,
  Question,
  Answer,
} from '../../models';
import { ObjectId } from '../../utils/mongoose';
import configUser from '../user/config';
import userService from '../user/service';
import configQuestionCategory from '../questionCategory/config';

/**
 *
 * @param {*} query
 * @returns
 */
const updateQuestionAnswer = async (body) => {
  const { user, question, answer, questionCategory } = body;
  const userObj = await User.findById(ObjectId(user));

  if (userObj.isRegisterProfile) {
    throw new Error(JSON.stringify({
      message: i18n.__('user.finishRegisterProfile'),
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

  let luffingTest = await LuffingTest.findOne({
    question: new ObjectId(question),
    user: new ObjectId(user),
    questionCategory: new ObjectId(questionCategory),
    type: questionCategoryObj.category,
  });

  if (luffingTest) {
    throw new Error(JSON.stringify({
      message: i18n.__('user.questionAlreadyAnswered'),
    }));
  }

  if (!luffingTest) {
    luffingTest = await LuffingTest.create({
      ...body,
      type: questionCategoryObj.category,
    });

    switch (questionCategoryObj.type) {
      case config.luffingTestType.LOVE:
        userObj.lovePoint = parseFloat(userObj.lovePoint + answerObj.point).toFixed(1);
        break;
      case config.luffingTestType.INTELLECT:
        userObj.intellectPoint = parseFloat(userObj.intellectPoint + answerObj.point).toFixed(1);
        break;
      case config.luffingTestType.SPIRIT:
        userObj.spiritPoint = parseFloat(userObj.spiritPoint + answerObj.point).toFixed(1);
        break;
      case config.luffingTestType.RESPONSIBILITY:
        userObj.responsibilityPoint = parseFloat(userObj.responsibilityPoint + answerObj.point).toFixed(1);
        break;
      case config.luffingTestType.INNOCENCE:
        userObj.innocencePoint = parseFloat(userObj.innocencePoint + answerObj.point).toFixed(1);
        break;
      default:
        break;
    }

    await userObj.save();
  }

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
 * @returns
 */
const finishLuffingTest = async (userId) => {
  let user = await User.findById(userId);
  const isCheckLuffingTest = await userService._checkFinishLuffingTest(ObjectId(userId));

  if (!isCheckLuffingTest) {
    throw new Error(JSON.stringify({
      message: i18n.__('user.notFinishLuffingTest'),
    }));
  }

  user = await User.findOneAndUpdate(
    {
      _id: ObjectId(user._id),
    },
    {
      isRegisterProfile: await _checkSettingLineMyProfile(user),
      step: configUser.step.LUFFING_TEST,
    },
    { new: true }
  ).populate([
    {
      path: 'avatars',
      ref: 'Image',
    },
  ]);

  return user;
};

/**
 *
 * @returns
 */
const getListAnswerLuffingTest = async (userId) => {
  const ids = await LuffingTest.find({
    user: ObjectId(userId),
    type: configQuestionCategory.category.LUFFING_TEST,
  }).select('_id answer');

  return { luffingTest: ids.map(item => item.answer) };
};

/**
 *
 * @param {*} userId
 * @returns
 */
const resetLuffingTest = async (userId) => {
  if (!process.env.NODE_ENV !== 'production') {
    await LuffingTest.remove({
      user: ObjectId(userId),
      type: configQuestionCategory.category.LUFFING_TEST,
    });

    const user = await User.findOneAndUpdate(
      { _id: ObjectId(userId) },
      {
        isRegisterProfile: false,
        step: configUser.step.SETTING_LINE,
        lovePoint: null,
        intellectPoint: null,
        spiritPoint: null,
        responsibilityPoint: null,
        innocencePoint: null,
      },
      { new: true }
    );

    return user;
  }

  return null;
};

export default {
  updateQuestionAnswer,
  finishLuffingTest,
  getListAnswerLuffingTest,
  resetLuffingTest,
  _checkSettingLineMyProfile,
};
