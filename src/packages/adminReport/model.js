import { mongoose, Schema } from '../../utils/mongoose';

const UserReportSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
export default mongoose.model('UserReport', UserReportSchema);

