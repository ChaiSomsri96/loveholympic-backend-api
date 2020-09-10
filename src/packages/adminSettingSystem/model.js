import { mongoose, Schema } from '../../utils/mongoose';

const SettingSystemSchema = new Schema(
  {
    setting: {
      type: JSON,
      default: null,
    },
    timeFrom: {
      type: String,
    },
    timeTo: {
      type: String,
    },
    isOpenCloseLoveHolympic: {
      type: Boolean,
      default: true,
    },
    goldenTicket: {
      type: JSON,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export default mongoose.model('SettingSystem', SettingSystemSchema);
