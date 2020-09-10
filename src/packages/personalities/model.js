import { mongoose, Schema } from '../../utils/mongoose'

const PersonalitySchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('Personality', PersonalitySchema);
