/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
import { Seeder } from 'mongoose-data-seed';
import { User } from '../src/models';

class UserCodeSeeder extends Seeder {
  async shouldRun() {
    return User.countDocuments({
      codeTesting: true,
    })
      .exec()
      .then(count => count === 0);
  }

  async run() {
    const data = [];

    for (let i = 555001; i < 555010; i++) {
      data.push({
        code: i,
        codeTesting: true,
      });
    }

    await User.insertMany(data);
  }
}

export default UserCodeSeeder;
