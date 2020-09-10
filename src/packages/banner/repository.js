import { Banner } from '../../models'
import { ObjectId } from '../../utils/mongoose';
import { initialOptions } from '../../utils/pagination';

const index = async (query) => {
  const options = initialOptions(query)
  const { limit, skip, sort } = options
  const match = { isActive: true }

  return {
    data: await Banner.find(match).sort(sort).skip(skip).limit(limit),
    total: await Banner.countDocuments(match)
  }
}

const indexAdmin = async (query) => {
  const options = initialOptions(query)
  const { limit, skip, sort } = options

  return {
    data: await Banner.find({}).sort(sort).skip(skip).limit(limit),
    total: await Banner.countDocuments({})
  }
}

const create = async (body) => {
  return Banner.create(body)
}

const findById = async (id) => {
  return Banner.findById(new ObjectId(id))
}

const update = async (id, body) => {
  return Banner.findOneAndUpdate({
    _id: new ObjectId(id)
  }, body, { new: true });
}

const destroy = async (id) => {
  return Banner.findByIdAndRemove(id);
};

export default {
  index,
  indexAdmin,
  create,
  findById,
  update,
  destroy
}
