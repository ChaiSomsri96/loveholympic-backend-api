import express from 'express';
import authorizator from '../../middlewares/authorizator';
import paramValidator from '../validator';
import controller from './controller';

const router = express.Router();

router.get(
  '/notifications/:id',
  authorizator.requireAdminLogin,
  paramValidator.adminComment.list,
  controller.list
);

router.post(
  '/reply',
  authorizator.requireAdminLogin,
  paramValidator.adminComment.replyComment,
  controller.replyComment
);

router.delete(
  '/:id',
  authorizator.requireAdminLogin,
  controller.destroy
);

router.delete(
  '/reply/:id',
  authorizator.requireAdminLogin,
  controller.deleteReply
);


export default router;
