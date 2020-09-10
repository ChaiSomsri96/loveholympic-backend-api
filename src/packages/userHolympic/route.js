import express from 'express'
import controller from './controller'
import paramValidator from '../validator';
import authorizator from '../../middlewares/authorizator';

const router = express.Router()

router.post(
  '/',
  authorizator.requireLogin,
  paramValidator.userHolympic.create,
  controller.create
);

router.get(
  '/verify',
  authorizator.requireLogin,
  controller.verify
);

export default router
