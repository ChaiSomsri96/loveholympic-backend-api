import express from 'express';
import authorizator from '../../middlewares/authorizator';
import controller from './controller';
import paramValidator from '../validator';

const router = express.Router();

router.get(
  '/',
  authorizator.requireAdminLogin,
  controller.index
);

router.post(
  '/',
  authorizator.requireAdminLogin,
  paramValidator.settingSystem.create,
  controller.create
);

router.post(
  '/config-system',
  authorizator.requireAdminLogin,
  paramValidator.settingSystem.configSystem,
  controller.configSystem,
);

router.get(
  '/reset-all-data',
  authorizator.requireAdminLogin,
  controller.resetAllData,
);

router.get(
  '/reset-data-test',
  authorizator.requireAdminLogin,
  controller.resetDataTest,
);

router.get(
  '/send-all-sms',
  authorizator.requireAdminLogin,
  controller.sendAllSms,
);

export default router;
