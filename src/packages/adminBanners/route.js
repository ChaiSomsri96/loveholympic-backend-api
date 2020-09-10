import express from 'express';
import bannerCtrl from './controller';
import authorizator from '../../middlewares/authorizator';
import paramValidator from '../validator';

const router = express.Router();

router.get(
  '/',
  authorizator.requireAdminLogin,
  paramValidator.banner.validateListBanner,
  bannerCtrl.list
);

router.get('/:id', authorizator.requireAdminLogin, bannerCtrl.detail);

router.post(
  '/',
  authorizator.requireAdminLogin,
  paramValidator.banner.validateEditBanner,
  bannerCtrl.create
);

router.put(
  '/:id',
  authorizator.requireAdminLogin,
  paramValidator.banner.validateEditBanner,
  bannerCtrl.edit
);

router.delete('/:id', authorizator.requireAdminLogin, bannerCtrl.destroy);

router.post(
  '/image-manage',
  authorizator.requireAdminLogin,
  paramValidator.banner.createImageManage,
  bannerCtrl.createImageManage,
);

export default router;
