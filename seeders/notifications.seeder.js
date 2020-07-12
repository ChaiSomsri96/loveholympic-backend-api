/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import _ from 'lodash'
import { Seeder } from 'mongoose-data-seed';
import { User, Notification } from '../src/models';
import { ObjectId } from '../src/utils/mongoose';

class NotificaitonSeeder extends Seeder {
  async shouldRun() {
    return true;
  }

  async run() {
    const testData = [];
    const users = await User.find().select('_id');

    for (let i = 0; i < 30; i++) {
      testData.push({
        user: ObjectId('606ab8020e55150b0612eb5c'),
        userSelected: ObjectId(_.sampleSize(users, 1)[0]._id),
      });
    }
    await Notification.insertMany(testData);
  }
}

export default NotificaitonSeeder;
