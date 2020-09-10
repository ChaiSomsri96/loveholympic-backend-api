import _ from 'lodash';
import { mongoose, Schema } from '../../utils/mongoose';
import config from './config';

const UserLuckySchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'User',
      default: null,
    },
    goldenTicket: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'GoldenTicket',
      default: null,
    },
    type: {
      type: String,
      enum: _.values(config.type),
    },
    isPlayed: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('UserLucky', UserLuckySchema);
