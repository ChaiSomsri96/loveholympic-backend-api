import express from 'express'
import authorizator from '../../middlewares/authorizator'
import controller from './controller'
import paramValidator from '../validator'
import preQuery from '../../utils/pre-query'

const router = express.Router()

router.get(
  '/',
  authorizator.requireLogin,
  paramValidator.notificationSystem.notificationSystemList,
  controller.index
);

router.get(
  '/:id',
  authorizator.requireLogin,
  paramValidator.notificationSystem.detail,
  controller.show
);

router.patch(
  '/:id/like',
  authorizator.requireLogin,
  controller.likeAndUnlike
);

router.get(
  '/:id/comments',
  authorizator.requireLogin,
  paramValidator.notificationSystem.listComment,
  controller.listComment
);

router.param('id', preQuery.notificationSystem)

export default router
