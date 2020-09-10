import express from 'express';
import authorizator from '../../middlewares/authorizator';
import paramValidator from '../validator';
import controller from './controller';

const router = express.Router();

router.get(
  '/',
  authorizator.requireLogin,
  paramValidator.notifications.list,
  controller.list,
);

router.get(
  '/detail/:id',
  authorizator.requireLogin,
  controller.detail,
);

router.patch('/accepted/:id', authorizator.requireLogin, controller.accepted);

router.patch('/rejected/:id', authorizator.requireLogin, controller.rejected);

router.post(
  '/chat/share-phone',
  authorizator.requireLogin,
  paramValidator.notifications.sharePhone,
  controller.chatSharePhone,
);

router.post(
  '/chat/reject-phone',
  authorizator.requireLogin,
  paramValidator.notifications.rejectPhone,
  controller.chatRejectPhone,
);

export default router;
