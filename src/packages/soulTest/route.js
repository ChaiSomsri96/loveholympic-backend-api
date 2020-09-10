import express from 'express'
import constroller from './controller'
import authorizator from '../../middlewares/authorizator';
import paramValidator from '../validator';

const router = express.Router()

router.put(
  '/update',
  authorizator.requireLogin,
  paramValidator.luffingTest.updateQuestionAnswer,
  constroller.updateQuestionAnswer
);

router.patch(
  '/finish',
  authorizator.requireLogin,
  constroller.doneSoulTest
);

router.get('/answers', authorizator.requireLogin, constroller.getUserAnswered);

router.get('/reset', authorizator.requireLogin, constroller.resetSoulTest);

router.get('/detail', authorizator.requireLogin, constroller.detail);

export default router
