import { Banner } from '../../models';
import { initialOptions } from '../../utils/pagination';
import config from './config';

/**
 *
 * @param {*} query
 * @returns
 */
const list = async (query) => {
  const { type } = query;
  const options = initialOptions(query);
  const { limit, skip, sort, page, sortBy, sortType } = options;
  const match = {
    isActive: true,
    deletedAt: { $eq: null },
    type: type || config.typeBanner.TOP,
  };
  const [banners, total] = await Promise.all([
    Banner.find(match).sort(sort).skip(skip).limit(limit).lean(),
    Banner.countDocuments(match),
  ]);

  return {
    results: banners,
    total,
    page,
    limit,
    sortBy,
    sortType: parseInt(sortType, 10),
  };
};

export default {
  list,
};
