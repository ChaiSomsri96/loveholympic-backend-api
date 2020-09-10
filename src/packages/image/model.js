import { mongoose, Schema } from '../../utils/mongoose'

const ImageSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  imageLink: {
    type: String,
    required: true
  },
  imageFeatureLink: {
    required: true,
    type: String
  },
  imageThumbnailLink: {
    required: true,
    type: String
  },
  imageAvatarLink: {
    required: true,
    type: String
  },
}, {
  versionKey: false,
  timestamps: true
})

export default mongoose.model('Image', ImageSchema)
