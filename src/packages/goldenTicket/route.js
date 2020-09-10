import express from 'express';
import controller from './controller';
import authorizator from '../../middlewares/authorizator';

const router = express.Router();

router.get(
  '/',
  authorizator.requireLogin,
  controller.list
);

router.get(
  '/user-lucky',
  authorizator.requireLogin,
  controller.findUserLucky
);

export default router;
