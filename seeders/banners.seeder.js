/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
import { Seeder } from 'mongoose-data-seed';
import { Banner, Image } from '../src/models';
import { ObjectId } from '../src/utils/mongoose';

class BannerSeeder extends Seeder {
  async shouldRun() {
    return Banner.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    const [image1, image2] = await Promise.all([
      Image.findById(ObjectId('6066e51f4f7e034ac2274022')),
      Image.findById(ObjectId('6066e5304f7e034ac2274023')),
    ]);

    const userCode = [
      {
        isActive: true,
        image: image1 ? image1.imageFeatureLink : null,
        description: 'test',
      },
      {
        isActive: true,
        image: image2 ? image2.imageFeatureLink : null,
        description: 'test',
      },
    ];
    await Banner.insertMany(userCode);
  }
}

export default BannerSeeder;
