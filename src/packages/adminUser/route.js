import express from 'express';
import controller from './controller';
import authorizator from '../../middlewares/authorizator';
import paramValidator from '../validator'

const router = express.Router();
const upload = require('../../utils/excelMulter');

router.get(
  '/list-code',
  authorizator.requireAdminLogin,
  paramValidator.adminUser.list,
  controller.list
);

router.post(
  '/destroy',
  authorizator.requireAdminLogin,
  paramValidator.adminUser.destroy,
  controller.destroy
);

router.post(
  '/import-code',
  authorizator.requireAdminLogin,
  upload.single('file'),
  controller.importCode
);

router.get(
  '/management',
  authorizator.requireAdminLogin,
  paramValidator.adminUser.list,
  controller.getUserManagement
);

router.get(
  '/detail/:id',
  authorizator.requireAdminLogin,
  controller.userDetail
);

export default router;
