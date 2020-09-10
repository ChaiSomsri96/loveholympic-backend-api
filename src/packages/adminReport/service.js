/* eslint-disable import/first */
/* eslint-disable no-underscore-dangle */
import UserReport from './model';
import User from '../user/model';
import i18n from 'i18n';
import { initialOptions } from '../../utils/pagination';
import { ObjectId } from '../../utils/mongoose';
import _ from 'lodash';

/**
 *
 * @param {*}
 * @returns
 */
const create = async (body) => {
  const exitReport = await UserReport.findOne({
    userId: body.userId,
    reporterId: body.reporterId
  })
  if (!exitReport) {
    const report = await UserReport.create(body);
    return report;
  } else {
    throw new Error(JSON.stringify({
      message: i18n.__('User was report'),
    }));
  }
}

const list = async (query) => {
  const { status } = query;
  const options = initialOptions(query);
  const { limit, skip, sort, page, sortBy, sortType, search } = options;
  const matchOr = {
    'user.isActive': status !== 'false'
  }

  if (typeof search === 'string' && search.length) {
    matchOr.$or = [
      { 'user.code': { $regex: search, $options: 'i' } },
      { 'user.nickname': { $regex: search, $options: 'i' } },
    ]
  }

  const pipe = [
    {
      $group: {
        _id: '$reporterId',
        reporterId: { $first: '$reporterId' },
        totalReport: {
          $sum: 1
        },
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $unwind:
      {
        path: '$user',
        preserveNullAndEmptyArrays: false
      },
    },
    {
      $match: matchOr
    },
    {
      $facet: {
        total: [{ $count: 'total' }],
        data: [{ $skip: skip }, { $limit: limit }, { $sort: sort }]
      }
    }
  ]

  const reports = await UserReport.aggregate(pipe)

  return {
    results: _.get(reports, '0.data') || [],
    total: _.get(reports, '0.total.0.total'),
    page,
    limit,
    sortBy,
    sortType,
  };
};

const block = async (body) => {
  try {
    const { ids, status } = body
    if (ids && ids.length) {
      await Promise.all(ids.map(u =>
        User.findOneAndUpdate(
          { _id: ObjectId(u) },
          { isActive: !status },
          { new: true }
        )));
    }

    return {
      message: 'success'
    }
  } catch (error) {
    throw new Error(JSON.stringify({
      message: i18n.__('User not found'),
    }))
  }
}

export default {
  list,
  create,
  block
}
