import express from 'express';
import AdminCtrl from './controller';
import paramValidator from '../validator';
import authorizator from '../../middlewares/authorizator';

const router = express.Router();

router.post('/login', paramValidator.admin.login, AdminCtrl.login);

router.get('/me', AdminCtrl.getMe);

router.put(
  '/update-profile',
  authorizator.requireAdminLogin,
  paramValidator.admin.updateProfile,
  AdminCtrl.updateProfile,
);

router.put(
  '/update-password',
  authorizator.requireAdminLogin,
  paramValidator.admin.updatePassword,
  AdminCtrl.updatePassword,
);

export default router;
