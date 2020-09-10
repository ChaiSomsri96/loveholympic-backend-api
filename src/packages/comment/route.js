import express from 'express';
import paramValidator from '../validator';
import controller from './controller';
import preQuery from '../../utils/pre-query';
import authorizator from '../../middlewares/authorizator';

const router = express.Router();

router.post(
  '/',
  authorizator.requireLogin,
  paramValidator.comment.createComment,
  controller.create
);

router.get(
  '/:id',
  authorizator.requireLogin,
  controller.show
);

router.patch(
  '/:id/like',
  authorizator.requireLogin,
  controller.likeAndUnlikeComment
);

router.delete(
  '/:id',
  authorizator.requireLogin,
  controller.destroy
);

router.param('id', preQuery.comment)

export default router;
