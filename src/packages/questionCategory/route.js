import express from 'express'
import controller from './controller'
import authorizator from '../../middlewares/authorizator';

const router = express.Router()

router.get(
  '/',
  authorizator.requireLogin,
  controller.index
);

router.get('/soul-test', authorizator.requireLogin, controller.getSoulTest);

export default router
