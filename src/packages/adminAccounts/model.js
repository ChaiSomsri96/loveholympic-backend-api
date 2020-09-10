import { mongoose, Schema } from '../../utils/mongoose'
import methods from './method'
import hooks from './hook'

const AdminSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  password: String,
  name: {
    type: String,
    default: null,
  }
}, {
  versionKey: false,
  timestamps: true
})

AdminSchema.index({ username: 1 })

AdminSchema.methods = methods

AdminSchema.pre('save', function (next) {
  hooks.preSaveHook(this, next);
});

export default mongoose.model('Admin', AdminSchema)
