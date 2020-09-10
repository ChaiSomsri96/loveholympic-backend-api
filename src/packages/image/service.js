import map from 'apr-map'
import repo from './repository';
import imageConfig from './config'

const { avatar, feature, origin, thumbnail } = imageConfig.imageTypes

const uploadImage = async (images, userId) => {
  const dataMedia = [];
  await map.series(images, async (image) => {
    const data = {
      user: userId,
    }
    await map.series(image.transforms, async (transform) => {
      switch (transform.id) {
        case origin:
          data.imageLink = transform.location
          break;
        case feature:
          data.imageFeatureLink = transform.location
          break;
        case thumbnail:
          data.imageThumbnailLink = transform.location
          break;
        case avatar:
          data.imageAvatarLink = transform.location
          break;
        default:
          break;
      }
    })
    await dataMedia.push(data)
  });

  return repo.createImage(dataMedia);
}

export default {
  uploadImage,
};
