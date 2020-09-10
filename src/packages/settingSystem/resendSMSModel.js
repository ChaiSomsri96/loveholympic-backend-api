import { mongoose, Schema } from '../../utils/mongoose';

const ResendSMSSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'User',
    },
    phone: String,
    code: String,
    smsContent: String,
    status: {
      type: Number,
      enum: [0, 1],
      default: 0,
    }

  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('ResendSMS', ResendSMSSchema, 'resendSMS');
