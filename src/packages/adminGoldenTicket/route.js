import express from 'express';
import controller from './controller';
import authorizator from '../../middlewares/authorizator';
import paramValidator from '../validator';

const router = express.Router();

router.get(
  '/',
  authorizator.requireAdminLogin,
  controller.list
);

router.post(
  '/',
  authorizator.requireAdminLogin,
  paramValidator.goldenTicket.create,
  controller.create
);

router.put(
  '/:id',
  authorizator.requireAdminLogin,
  paramValidator.goldenTicket.update,
  controller.update
);

router.get('/list-user', authorizator.requireAdminLogin, controller.listUser);

router.get('/results', authorizator.requireAdminLogin, paramValidator.goldenTicket.list, controller.listUserLucky);

export default router;
