/* eslint-disable no-return-await */
import mongoose from 'mongoose';
import {
  QuestionAnswerSeeder,
  SoulTestSeeder,
  SettingSystemSeeder,
  UserSeeder,
  NotificaitonSeeder,
  ClearDatabaseSeeder,
  AdminSeeder,
  NotificationSystemSeeder,
  BannerSeeder,
  GoldenTicketSeeder,
  UserCodeSeeder,
} from './seeders';

const mongoURL =
  process.env.MONGO_URL || 'mongodb://172.31.35.144:27017/prod-festfive';

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
export const seedersList = {
  QuestionAnswerSeeder,
  SoulTestSeeder,
  SettingSystemSeeder,
  UserSeeder,
  NotificaitonSeeder,
  ClearDatabaseSeeder,
  AdminSeeder,
  NotificationSystemSeeder,
  BannerSeeder,
  GoldenTicketSeeder,
  UserCodeSeeder,
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
export const connect = async () =>
  await mongoose.connect(mongoURL, { useNewUrlParser: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
export const dropdb = async () => mongoose.connection.db.dropDatabase();
