import express from 'express';
import Controller from './controller';
import authorizator from '../../middlewares/authorizator';

const router = express.Router();

router.post('/', authorizator.requireAdminLogin, Controller.create);

router.get('/', authorizator.requireAdminLogin, Controller.getDetail);

router.post('/send-user', authorizator.requireAdminLogin, Controller.sendUser);

export default router;
