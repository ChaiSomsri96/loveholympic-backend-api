import { QuestionCategory } from '../../models';
import { initialOptions } from '../../utils/pagination';

/**
 *
 * @param {*} query
 * @returns
 */
const list = async (query) => {
  const options = initialOptions(query);
  const { limit, skip, sort, page, sortBy, sortType } = options;
  const total = await QuestionCategory.countDocuments();
  const questions = await QuestionCategory.find({})
    .sort(sort)
    .skip(skip)
    .limit(limit);

  return {
    results: questions,
    total,
    page,
    limit,
    sortBy,
    sortType,
  };
};

export default {
  list,
};
