import { mongoose, Schema } from '../../utils/mongoose';

const AdminCommentSchema = new Schema(
  {
    comment: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Comment',
    },
    content: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('AdminComment', AdminCommentSchema);
