import express from 'express';
import ReportController from './controller';
import authorizator from '../../middlewares/authorizator';
import paramValidator from '../validator'

const router = express.Router();

router.post(
  '/',
  authorizator.requireLogin,
  paramValidator.report.create,
  ReportController.create
);

export default router;
