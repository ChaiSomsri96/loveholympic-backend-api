import map from 'apr-map';
import { isEmpty } from 'lodash';
import { Image } from '../../models';
import { initialOptions } from '../../utils/pagination';
import { transformPhoto } from '../../utils/photo';

const index = async (query) => {
  const options = initialOptions(query);
  const { page, limit, skip, sort } = options;

  const total = await Image.countDocuments();
  const data = await Image.find().sort(sort).skip(skip).limit(limit).lean();
  let results = [];
  if (!isEmpty(data)) {
    results = data.map(item => transformPhoto(item));
  }

  return {
    page,
    limit,
    total,
    results,
  };
};

const createImage = async (data) => {
  const images = [];
  await map.series(data, async (mediaData) => {
    const image = new Image(mediaData);
    await image.save();
    images.push(image._doc);
  });
  return images;
};

export default {
  index,
  createImage,
};
