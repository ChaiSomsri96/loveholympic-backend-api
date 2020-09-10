import { mongoose, Schema } from '../../utils/mongoose';

const UserSoulTestSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'User',
    },
    temparatureLove: {
      type: Number,
      default: null,
    },
    opinionOfLove: {
      type: Number,
      default: null,
    },
    relationships: {
      type: Number,
      default: null,
    },
    dating: {
      type: Number,
      default: null,
    },
    showAffection: {
      type: Number,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('UserSoulTest', UserSoulTestSchema);
