import _ from 'lodash'
import { mongoose, Schema } from '../../utils/mongoose';
import config from './config';

const NotificationSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'User',
    },
    userSelected: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'User',
    },
    status: {
      type: String,
      enum: _.values(config.status),
      default: config.status.PENDING,
    },
    typeMatching: {
      type: String,
      enum: _.values(config.type),
    },
    phoneUser: {
      type: String,
      default: null,
    },
    phoneUserSelected: {
      type: String,
      default: null,
    },
    rejectUserPhone: {
      type: Boolean,
      default: false,
    },
    rejectUserSelectedPhone: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      default: null,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export default mongoose.model('Notification', NotificationSchema);
