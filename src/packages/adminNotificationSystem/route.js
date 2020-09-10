import express from 'express';
import controller from './controller';
import authorizator from '../../middlewares/authorizator';
import paramValidator from '../validator';

const router = express.Router();

router.get(
  '/',
  authorizator.requireAdminLogin,
  paramValidator.notificationSystem.notificationSystemList,
  controller.index,
);

router.post(
  '/',
  authorizator.requireAdminLogin,
  paramValidator.notificationSystem.create,
  controller.create,
);

router.delete('/:id', authorizator.requireAdminLogin, controller.destroy);

router.put(
  '/:id',
  authorizator.requireAdminLogin,
  paramValidator.notificationSystem.create,
  controller.update,
);

router.get(
  '/priority/:id',
  authorizator.requireAdminLogin,
  controller.updatePriority,
);

router.get('/:id', authorizator.requireAdminLogin, controller.detail);

export default router;
