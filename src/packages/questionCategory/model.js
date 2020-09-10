import _ from 'lodash';
import { mongoose, Schema } from '../../utils/mongoose';
import config from './config';

const QuestionCategorySchema = new Schema(
  {
    title: String,
    color: {
      type: String,
      default: null,
    },
    order: {
      type: Number,
      default: null,
    },
    questions: {
      type: [{ type: mongoose.Schema.Types.ObjectID, ref: 'Question' }],
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      enum: _.values(config.category),
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('QuestionCategory', QuestionCategorySchema);
