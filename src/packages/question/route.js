import express from 'express'
import controller from './controller'
import paramValidator from '../validator';
import authorizator from '../../middlewares/authorizator';

const router = express.Router()

router.get(
  '/',
  authorizator.requireLogin,
  paramValidator.questionCategory.validateListQuestionCategory,
  controller.index
);

export default router
