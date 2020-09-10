import { NotificationSystem } from '../../models'
import { ObjectId } from '../../utils/mongoose';
import { initialOptions } from '../../utils/pagination';

const index = async (query) => {
  const options = initialOptions(query);
  const { limit, skip, sort, page } = options;
  const match = {
    deletedAt: { $eq: null }
  };
  const results = await NotificationSystem.find(match).sort(sort).skip(skip).limit(limit);
  const total = await NotificationSystem.countDocuments(match)

  return {
    page,
    limit,
    total,
    results,
  };
}

const incrementColumn = async (id, field, value = 1) => {
  const notification = await NotificationSystem.findOneAndUpdate(
    {
      _id: new ObjectId(id)
    },
    { $inc: { [field]: value } },
    { new: true }
  );

  return notification;
}

export default {
  index,
  incrementColumn,
}
