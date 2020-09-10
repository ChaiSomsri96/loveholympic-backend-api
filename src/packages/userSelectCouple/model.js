import { mongoose, Schema } from '../../utils/mongoose';

const UserSelectCoupleSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'User',
    },
    userSelected: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'User',
    },
    match: {
      type: Number,
      default: null,
    },
    round: {
      type: Number,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('UserSelectCouple', UserSelectCoupleSchema);
