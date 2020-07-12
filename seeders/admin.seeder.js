/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
import { Seeder } from 'mongoose-data-seed';
import { Admin } from '../src/models';
import ENV from '../src/env';

class AdminSeeder extends Seeder {
  async shouldRun() {
    return Admin.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    const createData = {
      username: "admin",
      password: "463125hhhh@@",
    };

    await Admin.create(createData);
  }
}

export default AdminSeeder;
