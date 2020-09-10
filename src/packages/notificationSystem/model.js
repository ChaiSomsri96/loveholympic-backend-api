import { mongoose, Schema } from '../../utils/mongoose';

const NotificationSystemSchema = new Schema(
  {
    name: String,
    title: String,
    description: String,
    icon: String,
    order: {
      type: Number,
      default: null,
    },
    totalLike: {
      type: Number,
      default: 0,
    },
    totalView: {
      type: Number,
      default: 0,
    },
    totalComment: {
      type: Number,
      default: 0,
    },
    image: String,
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

export default mongoose.model('NotificationSystem', NotificationSystemSchema);
