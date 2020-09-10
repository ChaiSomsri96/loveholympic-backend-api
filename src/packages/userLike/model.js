import { mongoose, Schema } from '../../utils/mongoose'

const UserLikeSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    notificationSystem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NotificationSystem',
      default: null,
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
    isLike: {
      type: Boolean,
      default: true,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('UserLike', UserLikeSchema);
