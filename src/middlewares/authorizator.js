/* eslint-disable no-underscore-dangle */
import httpStatus from 'http-status';
import i18n from 'i18n';
import ResponseBuilder from '../utils/response-builder';
import errorUtil from '../utils/error';
import { Admin, User } from '../models';

/**
 *
 * @param {*} user
 * @returns
 */
const isAuthenticated = (user) => {
  return user && user._id;
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const requireLogin = async (req, res, next) => {
  const isAuthorized = await isAuthenticated(req.user);
  if (!isAuthorized) {
    return res.status(httpStatus.UNAUTHORIZED).jsonp(ResponseBuilder.build(
      false,
      null,
      errorUtil.parseError({
        message: i18n.__('auth.tokenInvalid'),
      })
    ));
  }

  const user = await User.findOne({
    _id: isAuthorized,
    deletedAt: { $eq: null },
  });

  if (!user) {
    return res.status(httpStatus.UNAUTHORIZED).jsonp(ResponseBuilder.build(
      false,
      null,
      errorUtil.parseError({
        message: i18n.__('auth.tokenInvalid'),
      })
    ));
  }

  const { isActive } = user;
  if (!isActive) {
    return res.status(httpStatus.UNAUTHORIZED).jsonp(ResponseBuilder.build(
      false,
      null,
      errorUtil.parseError({
        message: i18n.__('user.deactive'),
      })
    ));
  }
  next();
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const requireAdminLogin = async (req, res, next) => {
  const isAuthorized = await isAuthenticated(req.user);

  if (!isAuthorized) {
    return res.status(httpStatus.UNAUTHORIZED).jsonp(ResponseBuilder.build(
      false,
      null,
      errorUtil.parseError({
        message: i18n.__('auth.tokenInvalid'),
      })
    ));
  }

  const admin = await Admin.findById(isAuthorized);

  if (!admin) {
    return res.status(httpStatus.UNAUTHORIZED).jsonp(ResponseBuilder.build(
      false,
      null,
      errorUtil.parseError({
        message: i18n.__('auth.tokenInvalid'),
      })
    ));
  }

  next();
};

export default {
  requireLogin,
  requireAdminLogin,
};
