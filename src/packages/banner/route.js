import express from 'express';
import authorizator from '../../middlewares/authorizator';
import paramValidator from '../validator';
import BannerCtrl from './controller';

const router = express.Router();

router.get(
  '/',
  authorizator.requireLogin,
  paramValidator.banner.validateListBanner,
  BannerCtrl.index
);

export default router;
