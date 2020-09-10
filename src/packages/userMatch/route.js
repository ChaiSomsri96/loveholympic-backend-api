import express from 'express';
import controller from './controller';
import paramValidator from '../validator';
import authorizator from '../../middlewares/authorizator';

const router = express.Router();

router.get('/', authorizator.requireLogin, controller.findUserMatching);

router.get('/soul-friend', authorizator.requireLogin, controller.findSoulFriend);

router.post(
  '/selected',
  authorizator.requireLogin,
  paramValidator.userMatch.nextMatchRound,
  controller.nextMatchRound
);

router.post(
  '/final-round',
  authorizator.requireLogin,
  paramValidator.userMatch.finalRound,
  controller.finalRealHolympic
);

// router.get(
//   '/reset-matching',
//   authorizator.requireLogin,
//   controller.resetMatching
// );

export default router;
