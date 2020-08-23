/* eslint-disable no-underscore-dangle */
import i18n from 'i18n';
import express from 'express';
import { verify } from 'jsonwebtoken';
import httpStatus from 'http-status';
import responseBuilder from '../utils/response-builder';
import errorUtil from '../utils/error';
import envConfig from '../env';

const router = express.Router();
const numericFields = ['page'];
const whiteList = [
  '/sessions',
  '/users/register',
  '/users/login',
  '/users/login/email',
  '/users/exist-system',
  '/users/verify-code',
  '/admin/login',
  '/setting-system/verify-time',
  '/check_status',
  '/admin/check_status',
];

router.use((req, res, next) => {
  // Cast all number in query data to number type instead of string
  for (const key in req.query) {
    if (
      numericFields.indexOf(key) !== -1 &&
      req.query[key] === Number(req.query[key])
    ) {
      req.query[key] = Number(req.query[key]);
    }
  }

  if (whiteList.includes(req.baseUrl)) {
    return next();
  }

  const token = req.headers.authorization;

  if (token) {
    verify(token.split(' ')[1], envConfig.jwt.secret, (error, decoded) => {
      if (error) {
        return res.status(httpStatus.UNAUTHORIZED).jsonp(responseBuilder.build(
          false,
          null,
          errorUtil.parseError({
            message: i18n.__('auth.tokenInvalid'),
          })
        ));
      }
      if (typeof decoded === 'string') {
        decoded = JSON.parse(decodeURIComponent(decoded));
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(httpStatus.UNAUTHORIZED).jsonp(responseBuilder.build(
      false,
      null,
      errorUtil.parseError({
        message: i18n.__('auth.tokenInvalid'),
      })
    ));
  }
});

export default router;
