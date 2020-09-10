import express from 'express';
import authorizator from '../../middlewares/authorizator';
import controller from './controller';

const router = express.Router();

router.get('/', controller.index);

router.get('/lohol-good', authorizator.requireLogin, controller.loholGood);

router.get('/verify-time', controller.verifyTimeSystem);

export default router;
