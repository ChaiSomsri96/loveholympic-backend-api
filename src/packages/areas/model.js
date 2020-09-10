import { mongoose, Schema } from '../../utils/mongoose'

const AreaSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('Area', AreaSchema);
