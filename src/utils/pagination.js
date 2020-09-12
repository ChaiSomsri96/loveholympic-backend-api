import Joi from 'joi';
import constValues from '../constants';

export const initialOptions = (query) => {
  const page = query.page || constValues.pagination.page
  const limit = query.limit || constValues.pagination.limit
  const skip = limit * page
  const sortType = Number(query.sortType) || -1
  const sortBy = query.sortBy || 'createdAt'
  const search = query.search || ''

  return {
    page,
    limit,
    skip,
    sort: { [sortBy]: sortType },
    sortType,
    sortBy,
    search,
  };
}

export const paginateValidateDefault = {
  page: Joi.number().label('page'),
  limit: Joi.number().label('limit')
};
