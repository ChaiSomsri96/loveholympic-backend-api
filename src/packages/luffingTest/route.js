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
  // paramValidator.luffingTest.finishLuffingTest,
  constroller.finishLuffingTest
);

router.get(
  '/detail',
  authorizator.requireLogin,
  constroller.luffingTestDetail
);

router.get('/answers', authorizator.requireLogin, constroller.getUserAnswered);

router.get('/reset', authorizator.requireLogin, constroller.resetLuffingTest);

export default router
