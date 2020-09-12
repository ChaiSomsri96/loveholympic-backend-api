import config from '../configs'

const defaultPhoto = () => {
  return config.S3.host + config.amazon.name.defaultPhoto
}

const photo = (name) => {
  return name ? (config.S3.host + config.amazon.prefix.thumbnail + name) : defaultPhoto()
}

export const transformPhoto = (data) => {
  const baseUrl = process.env.AWS_BUCKET_IMAGE_BASE_URL
  const { imageAvatarLink, imageFeatureLink, imageLink, imageThumbnailLink } = data

  return {
    ...data,
    imageAvatarLink: `${baseUrl}/${imageAvatarLink}`,
    imageFeatureLink: `${baseUrl}/${imageFeatureLink}`,
    imageLink: `${baseUrl}/${imageLink}`,
    imageThumbnailLink: `${baseUrl}/${imageThumbnailLink}`,
  }
}

export const s3BaseURL = () => {
  const baseUrl = process.env.AWS_BUCKET_IMAGE_BASE_URL;

  return baseUrl;
}

export default {
  photo
}
