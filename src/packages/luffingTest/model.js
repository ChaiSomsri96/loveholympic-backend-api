import _ from 'lodash';
import { mongoose, Schema } from '../../utils/mongoose';
import configQuestionCategory from '../questionCategory/config';

const LuffingTestSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'User',
    },
    question: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Question',
    },
    answer: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Answer',
    },
    questionCategory: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'QuestionCategory',
    },
    type: {
      type: String,
      enum: _.values(configQuestionCategory.category),
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('LuffingTest', LuffingTestSchema);
