import express from 'express';
import UserCtrl from './controller';
import paramValidator from '../validator';
import authorizator from '../../middlewares/authorizator';

const router = express.Router();

router.post(
  '/login',
  paramValidator.user.login,
  UserCtrl.login
);

router.post('/login/email', paramValidator.user.loginByEmail, UserCtrl.loginByEmail);

router.post('/register', paramValidator.user.register, UserCtrl.register);

router.post(
  '/verify-code',
  paramValidator.user.verifyCode,
  UserCtrl.verifyCode
);

router.get('/me', authorizator.requireLogin, UserCtrl.getMe);

router.get('/detail/:id', authorizator.requireLogin, UserCtrl.getUserDetail);

router.post(
  '/update-profile',
  authorizator.requireLogin,
  paramValidator.user.updateProfile,
  UserCtrl.updateProfile
);

router.post(
  '/setting-line-profile',
  authorizator.requireLogin,
  paramValidator.user.settingLineProfile,
  UserCtrl.settingLineProfile
);

router.post(
  '/update-phone',
  authorizator.requireLogin,
  paramValidator.user.updatePhone,
  UserCtrl.updatePhone
);

router.post(
  '/likeandunlike',
  authorizator.requireLogin,
  paramValidator.user.likeAndUnlike,
  UserCtrl.likeAndUnlike,
);

export default router;
