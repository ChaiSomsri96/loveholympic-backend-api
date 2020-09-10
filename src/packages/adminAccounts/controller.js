/* eslint-disable no-underscore-dangle */
import { pick } from 'lodash';
import httpStatus from 'http-status';
import errorUtil from '../../utils/error';
import responseBuilder, { handleResponse } from '../../utils/response-builder';
import to from '../../utils/to';
import adminService from './service';

/**
 *
 * @param {*} req
 * @param {*} res
 */
const login = async (req, res) => {
  const data = pick(req.body, ['username', 'password']);
  const [error, response] = await to(adminService.login(data));

  if (error) {
    const { message } = error;
    return res.status(httpStatus.UNAUTHORIZED).jsonp(responseBuilder.build(
      false,
      null,
      errorUtil.parseError({
        message,
      })
    ));
  }

  res.jsonp(responseBuilder.build(true, response));
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const getMe = async (req, res) => {
  const [error, data] = await to(adminService.getMe(req));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const updateProfile = async (req, res) => {
  const body = pick(req.body, ['name', 'avatar']);
  const [error, data] = await to(adminService.updateProfile({
    ...body,
    adminId: req.user._id,
  }));
  handleResponse(req, res, error, data);
}

/**
 *
 * @param {*} req
 * @param {*} res
 */
const updatePassword = async (req, res) => {
  const [error, data] = await to(adminService.updatePassword(req));
  handleResponse(req, res, error, data);
}

export default {
  login,
  getMe,
  updateProfile,
  updatePassword,
};
