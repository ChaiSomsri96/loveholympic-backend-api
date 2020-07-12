/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
import { Seeder } from 'mongoose-data-seed';
import { GoldenTicket } from '../src/models';

class GoldenTicketSeeder extends Seeder {
  async shouldRun() {
    return GoldenTicket.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    const data = [
      {
        image:
          'https://keno-techain-dev.s3.ap-southeast-1.amazonaws.com/public/images/2021-4-2/9/7dc7870a5ccf652e2e52a45f91ac7625_1200',
        maxUser: 8,
      },
      {
        image:
          'https://keno-techain-dev.s3.ap-southeast-1.amazonaws.com/public/images/2021-4-2/9/3e23469d9e05ee771f1cc2f01c760472_1200',
        maxUser: 8,
      },
    ];
    await GoldenTicket.insertMany(data);
  }
}

export default GoldenTicketSeeder;
