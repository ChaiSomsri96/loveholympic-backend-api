import bcrypt from 'bcrypt';
import { pick } from 'lodash'

function authenticate(plainText) {
  return bcrypt.compareSync(plainText, this.password);
}
function hashPassword(plainText, saltRounds = 7) {
  if (!plainText) return '';
  return bcrypt.hashSync(plainText, saltRounds);
}

function genTokenData() {
  return pick(this, ['_id', 'roles', 'email'])
}

function genHashPassword() {
  this.password = this.hashPassword(this.password);
}

function hashInputPassword(password) {
  return hashPassword(password);
}

function comparePassword(comparePass, dbPassword) {
  return bcrypt.compareSync(comparePass, dbPassword);
}

export default {
  authenticate,
  genTokenData,
  hashPassword,
  genHashPassword,
  hashInputPassword,
  comparePassword,
};
