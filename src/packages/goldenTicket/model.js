import { mongoose, Schema } from '../../utils/mongoose';

const GoldenTicketSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    random: {
      type: Number,
      default: 0,
    },
    countUser: {
      type: Number,
      default: 0,
    },
    isOK: {
      type: Boolean,
      default: true,
    },
    imageLucky: {
      type: String,
      default: null,
    },
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

export default mongoose.model('GoldenTicket', GoldenTicketSchema);
