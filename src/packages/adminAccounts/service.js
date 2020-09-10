/* eslint-disable no-underscore-dangle */
import i18n from 'i18n';
import { Admin } from '../../models';
import { genAdminTokenObject } from '../../utils/gen-token';
import { ObjectId } from '../../utils/mongoose';

/**
 *
 * @param {*} body
 * @returns
 */
const login = async (body) => {
  const { username, password } = body;
  const admin = await Admin.findOne({ username });

  if (!admin) {
    throw new Error(JSON.stringify({
      message: i18n.__('authen.notExistEmail'),
    }));
  }

  if (admin.comparePassword(password, admin.password)) {
    const result = genAdminTokenObject(admin, '_id');
    return result;
  } else {
    throw new Error(JSON.stringify({
      message: i18n.__('authen.passwordInvalid'),
    }));
  }
};

/**
 *
 * @returns
 */
const getMe = async (req) => {
  const { _id } = req.user;
  const account = await Admin.findById(_id).select('-password');

  return account;
};

/**
 *
 * @param {*} req
 * @returns
 */
const updateProfile = async (body) => {
  return Admin.findOneAndUpdate({ _id: ObjectId(body.adminId) }, body, {
    new: true,
  }).select('-password');
};

/**
 *
 * @param {*} req
 * @returns
 */
const updatePassword = async (req) => {
  const { user, body } = req;
  const { _id } = user;
  const { passwordCurrent, password } = body;
  const admin = await Admin.findById(_id);

  if (!admin.comparePassword(passwordCurrent, admin.password)) {
    throw new Error(i18n.__('라는 메시지가 뜸'));
  }

  const newPassword = admin.hashPassword(password);

  return Admin.findByIdAndUpdate(
    { _id },
    { password: newPassword },
    { new: true },
  ).select('-password');
};

export default {
  login,
  getMe,
  updateProfile,
  updatePassword,
};
