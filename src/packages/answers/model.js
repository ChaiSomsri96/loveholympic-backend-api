import { mongoose, Schema } from '../../utils/mongoose'

const AnswerSchema = new Schema(
  {
    question: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Question',
    },
    title: String,
    point: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('Answer', AnswerSchema);
