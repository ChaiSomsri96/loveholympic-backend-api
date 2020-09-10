import httpStatus from 'http-status';
import { pick } from 'lodash';
import responseBuilder, { handleResponse } from '../../utils/response-builder';

import errorUtil from '../../utils/error';
import to from '../../utils/to';
import userService from './service';

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const register = async (req, res) => {
  const data = pick(req.body, [
    'accessToken',
    'socialType',
    'code',
    'type',
    'device',
    'deviceToken',
    'name',
    'email',
    'appleId',
  ]);
  const [error, response] = await to(userService.register(data));

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
 * @returns
 */
const verifyCode = async (req, res) => {
  const data = pick(req.body, ['code']);
  const [error, response] = await to(userService.verifyCode(data));

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

  res.jsonp(responseBuilder.build(true, null, response));
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const login = async (req, res) => {
  const data = pick(req.body, [
    'accessToken',
    'socialType',
    'device',
    'deviceToken',
    'name',
    'email',
    'appleId',
  ]);
  const [error, response] = await to(userService.login(data));

  if (error) {
    const { code } = error;

    if (code === 1001) {
      return res.jsonp(responseBuilder.build(false, null, errorUtil.parseError(error)));
    }

    return res.status(httpStatus.UNAUTHORIZED).jsonp(responseBuilder.build(
      false,
      null,
      errorUtil.parseError({
        message: error.message,
      })
    ));
  }

  res.jsonp(responseBuilder.build(true, response));
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getMe = async (req, res) => {
  const [error, data] = await to(userService.getMe(req));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const getUserDetail = async (req, res) => {
  const [error, data] = await to(userService.getUserDetail({
    id: req.params.id,
    userId: req.user._id,
  }));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const updateProfile = async (req, res) => {
  const body = pick(req.body, ['avatars', 'description']);
  const [error, data] = await to(userService.updateProfile({
    ...body,
    userId: req.user._id,
  }));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const settingLineProfile = async (req, res) => {
  const body = pick(req.body, [
    'gender',
    'age',
    'area',
    'hobbies',
    'personalities',
  ]);
  const [error, data] = await to(userService.settingLineProfile({
    ...body,
    userId: req.user._id,
  }));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const loginByEmail = async (req, res) => {
  const body = pick(req.body, ['email']);
  const [error, data] = await to(userService.loginByEmail(body));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const updatePhone = async (req, res) => {
  const body = pick(req.body, ['phoneNumber']);
  const [error, data] = await to(userService.updatePhone({
    ...body,
    userId: req.user._id,
  }));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const likeAndUnlike = async (req, res) => {
  const body = pick(req.body, ['userId', 'like']);
  const [error, data] = await to(userService.likeAndUnlike({
    ...body,
    userLogin: req.user._id,
  }));
  handleResponse(req, res, error, data);
};

export default {
  register,
  verifyCode,
  login,
  getMe,
  updateProfile,
  settingLineProfile,
  getUserDetail,
  loginByEmail,
  updatePhone,
  likeAndUnlike,
};
