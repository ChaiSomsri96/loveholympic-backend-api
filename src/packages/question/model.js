import { mongoose, Schema } from '../../utils/mongoose';

const QuestionSchema = new Schema(
  {
    questionCategory: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'QuestionCategory',
    },
    title: String,
    answers: [{ type: mongoose.Schema.Types.ObjectID, ref: 'Answer' }],
    order: {
      type: Number,
      default: null,
    },
    answerSelected: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Answer',
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('Question', QuestionSchema);
