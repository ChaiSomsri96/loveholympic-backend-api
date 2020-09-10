import { mongoose, Schema } from '../../utils/mongoose';

const SettingSMSSchema = new Schema(
  {
    smsContent: {
      type: String,
      default: null,
    },
    timeSend: {
      type: String,
      default: null,
    },
    isSend: {
      type: Boolean,
      default: false,
    },
    smsContentUser: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
export default mongoose.model('SettingSMS', SettingSMSSchema);

