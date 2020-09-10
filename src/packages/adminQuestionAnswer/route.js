import express from 'express';
import controller from './controller';
import authorizator from '../../middlewares/authorizator';
import paramValidator from '../validator'

const router = express.Router();

router.get(
  '/categories',
  authorizator.requireAdminLogin,
  paramValidator.questionCategory.validateListQuestionCategory,
  controller.list
);

router.put(
  '/categories/:id',
  authorizator.requireAdminLogin,
  paramValidator.questionCategory.validateListQuestionCategory,
  controller.list
);

router.post(
  '/',
  authorizator.requireAdminLogin,
  paramValidator.questionCategory.create,
  controller.create
);

router.delete('/:id', authorizator.requireAdminLogin, controller.destroy);

export default router;
