import _ from 'lodash';
import { mongoose, Schema } from '../../utils/mongoose';
import configUser from '../user/config';

const HobbySchema = new Schema(
  {
    gender: {
      type: String,
      enum: _.values(configUser.sex),
    },
    name: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('Hobby', HobbySchema);
