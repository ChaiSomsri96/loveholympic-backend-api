import config from '../configs'
import { mongoose } from './mongoose'

const isObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id)
}

const isEmail = (email) => {
  return config.regex.email.test(email)
}

// Export
export default {
  isObjectId,
  isEmail
}
