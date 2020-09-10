import { mongoose, Schema } from '../../utils/mongoose';

const UserMatchSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'User',
    },
    currentRound: {
      type: Number,
      default: null,
    },
    currentMatch: {
      type: Number,
      default: null,
    },
    isFinalRound: {
      type: Boolean,
      default: false,
    },
    matching32: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectID,
          ref: 'User',
        },
      ],
      default: null,
    },
    matching16: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectID,
          ref: 'User',
        },
      ],
      default: null,
    },
    matching8: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectID,
          ref: 'User',
        },
      ],
      default: null,
    },
    matching4: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectID,
          ref: 'User',
        },
      ],
      default: null,
    },
    matching2: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectID,
          ref: 'User',
        },
      ],
      default: null,
    },
    userCouples: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectID,
          ref: 'User',
        },
      ],
      default: null,
    },
    type: {
      type: String,
      default: null,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('UserMatch', UserMatchSchema);
