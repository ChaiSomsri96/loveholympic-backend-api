import _ from 'lodash'
import { mongoose, Schema } from '../../utils/mongoose'
import configGlobal from '../../configs'
import configUser from '../user/config'

const UserHolympicSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'User',
    },
    type: {
      type: String,
      enum: _.values(configGlobal.typeHolympic),
    },
    gender: {
      type: String,
      enum: _.values(configUser.sex),
    },
    age: {
      type: String,
      default: null,
    },
    area: {
      type: String,
      default: null,
    },
    hobbies: {
      type: String,
      default: null,
    },
    personalities: {
      type: String,
      default: null,
    },
    countFind: {
      type: Number,
      default: 0,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('UserHolympic', UserHolympicSchema);
