import { QuestionCategory } from '../../models';
import config from './config';

/**
 *
 * @param {*} query
 * @returns
 */
const list = async () => {
  const questions = await QuestionCategory.find({
    category: config.category.LUFFING_TEST
  })
    .sort({ order: 1 })
    .populate({
      path: 'questions',
      ref: 'Question',
      populate: {
        path: 'answers',
        ref: 'Answer',
      }
    });

  return {
    results: questions,
  };
};

const listSoulTest = async () => {
  const questions = await QuestionCategory.find({
    category: config.category.SOUL_TEST
  })
    .sort({ order: 1 })
    .populate({
      path: 'questions',
      ref: 'Question',
      populate: {
        path: 'answers',
        ref: 'Answer',
      }
    });

  return {
    results: questions,
  };
};

export default {
  list,
  listSoulTest,
};
