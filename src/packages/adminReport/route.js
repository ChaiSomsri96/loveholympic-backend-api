import express from 'express';
import ReportController from './controller';
import authorizator from '../../middlewares/authorizator';
import paramValidator from '../validator';

const router = express.Router();

router.get(
  '/',
  authorizator.requireAdminLogin,
  paramValidator.report.listReport,
  ReportController.list
);

router.put(
  '/block',
  authorizator.requireAdminLogin,
  ReportController.block
);


export default router;
