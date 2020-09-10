import { ObjectId } from '../../utils/mongoose'
import { initialOptions } from '../../utils/pagination';

const queryListComments = function (req) {
  const { notificationSystem } = req
  const options = initialOptions(req);
  const { limit, skip, sort } = options;
  const match = notificationSystem ? { notificationSystem: new ObjectId(notificationSystem) } : {}
  return [
    {
      $match: match
    },
    {
      $lookup: {
        from: 'admincomments',
        localField: '_id',
        foreignField: 'comment',
        as: 'adminComments'
      }
    },
    { $lookup:
        {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        }
    },
    { $unwind: {
      path: '$user',
      preserveNullAndEmptyArrays: true
    }
    },
    {
      $facet: {
        docs: [
          { $sort: sort },
          { $skip: skip },
          { $limit: limit },
        ],
        pageInfo: [
          { $group: { _id: null, count: { $sum: 1 } } }
        ]
      },
    }
  ]
}

export default {
  queryListComments
}
