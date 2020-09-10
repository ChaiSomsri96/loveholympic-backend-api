/* eslint-disable no-underscore-dangle */
import { initialOptions } from '../../utils/pagination';
import { QuestionCategory } from '../../models';

/**
 *
 * @param {*} query
 * @returns
 */
const list = async (query) => {
  const options = initialOptions(query);
  const { limit, skip, page } = options;
  const [questions, total] = await Promise.all([
    QuestionCategory.find({})
      .sort({ order: 1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'questions',
        ref: 'Question',
        populate: {
          path: 'answers',
          ref: 'Answer',
        },
      })
      .lean(),
    QuestionCategory.countDocuments(),
  ]);

  return {
    results: questions,
    total,
    page,
    limit,
  };
};

/**
 *
 * @param {*} body
 * @returns
 */
const create = async (body) => {
  const question = await QuestionCategory.create(body);

  return question;
};

export default {
  list,
  create,
};
