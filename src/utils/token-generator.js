import { sign } from 'jsonwebtoken'
import configEnv from '../env'

function generate(data, option = { expiresIn: '7d' }) {
  return sign(data, configEnv.jwt.secret, option)
}

export default {
  generate
}
