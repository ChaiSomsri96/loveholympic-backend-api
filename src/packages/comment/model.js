import { mongoose, Schema } from '../../utils/mongoose';

const CommentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'User',
      default: null,
    },
    notificationSystem: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'NotificationSystem',
    },
    content: String,
    replies: [
      {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Comment',
      },
    ],
    totalLike: {
      type: Number,
      default: 0,
    },
    userLikes: {
      type: [{ type: mongoose.Schema.Types.ObjectID, ref: 'User' }],
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('Comment', CommentSchema);
