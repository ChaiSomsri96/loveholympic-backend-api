import _ from 'lodash';
import { mongoose, Schema } from '../../utils/mongoose';
import config from './config';

const BannerSchema = new Schema(
  {
    image: String,
    description: String,
    url: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    position: {
      type: Number,
      default: null,
    },
    type: {
      type: String,
      enum: _.values(config.typeBanner),
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export default mongoose.model('Banner', BannerSchema);
