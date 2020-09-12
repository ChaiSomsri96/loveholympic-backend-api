import crypto from 'crypto'
import config from '../configs'
import configEnv from '../env'

const algorithm = 'aes-256-cbc'

function isMd5Hash(value) {
  return config.regex.password.test(value.toLowerCase())
}

function md5(text) {
  return crypto.createHash('md5').update(text).digest('hex')
}

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(md5(configEnv.crypto.secret)), configEnv.crypto.iv)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return encrypted.toString('hex')
}

function decrypt(text) {
  console.log(configEnv);
  const encryptedText = Buffer.from(text, 'hex')
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(md5(configEnv.crypto.secret)),
    configEnv.crypto.iv
  );
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}

export default {
  isMd5Hash,
  encrypt,
  decrypt
}
