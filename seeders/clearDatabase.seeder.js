/* eslint-disable class-methods-use-this */
import { Seeder } from 'mongoose-data-seed';
// import shelljs from 'shelljs';
import {
  AdminComment, Comment, GoldenTicket, LuffingTest,
  Notification, User,
  UserHolympic,
  UserLike,
  UserLucky,
  UserMatch,
  UserSelectCouple,
  UserSoulTest,
} from '../src/models';

class ClearDatabaseSeeder extends Seeder {
  async shouldRun() {
    return true;
  }

  async run() {
    await Promise.all([
      User.remove({
        code: {
          $nin: [
            '555000',
            '555001',
            '555002',
            '555003',
            '555004',
            '555005',
            '555006',
            '555007',
            '555008',
            '555009',
            '555010',
          ],
        },
      }),
      // NotificationSystem.remove({}),
      // Image.remove({}),
      // Banner.remove({}),
      // SettingSystem.remove({}),
      // Admin.remove({}),
      Comment.remove({}),
      GoldenTicket.remove({}),
      // QuestionCategory.remove({}),
      // Answer.remove({}),
      // Question.remove({}),
      Notification.remove({}),
      UserHolympic.remove({}),
      LuffingTest.remove({}),
      UserMatch.remove({}),
      AdminComment.remove({}),
      UserLike.remove({}),
      // Personality.remove({}),
      // Hobby.remove({}),
      // Area.remove({}),
      UserSelectCouple.remove({}),
      UserLucky.remove({}),
      UserSoulTest.remove({}),
    ]);

    // Run external tool synchronously
    // if (shelljs.exec('npm run seed SettingSystemSeeder').code !== 0) {
    //   shelljs.echo('Error: Seed SettingSystemSeeder failed');
    //   shelljs.exit(1);
    // }

    // if (shelljs.exec('npm run seed UserSeeder').code !== 0) {
    //   shelljs.echo('Error: Seed UserSeeder failed');
    //   shelljs.exit(1);
    // }

    // if (shelljs.exec('npm run seed AdminSeeder').code !== 0) {
    //   shelljs.echo('Error: Seed AdminSeeder failed');
    //   shelljs.exit(1);
    // }

    // if (shelljs.exec('npm run seed SettingSystemSeeder').code !== 0) {
    //   shelljs.echo('Error: Seed SettingSystemSeeder failed');
    //   shelljs.exit(1);
    // }

    // if (shelljs.exec('npm run seed QuestionAnswerSeeder').code !== 0) {
    //   shelljs.echo('Error: Seed QuestionAnswerSeeder failed');
    //   shelljs.exit(1);
    // }

    // if (shelljs.exec('npm run seed SoulTestSeeder').code !== 0) {
    //   shelljs.echo('Error: Seed SoulTestSeeder failed');
    //   shelljs.exit(1);
    // }

    // if (shelljs.exec('npm run seed NotificationSystemSeeder').code !== 0) {
    //   shelljs.echo('Error: Seed NotificationSystemSeeder failed');
    //   shelljs.exit(1);
    // }

    // if (shelljs.exec('npm run seed BannerSeeder').code !== 0) {
    //   shelljs.echo('Error: Seed BannerSeeder failed');
    //   shelljs.exit(1);
    // }

    // if (shelljs.exec('npm run seed GoldenTicketSeeder').code !== 0) {
    //   shelljs.echo('Error: Seed GoldenTicketSeeder failed');
    //   shelljs.exit(1);
    // }
  }
}

export default ClearDatabaseSeeder;
