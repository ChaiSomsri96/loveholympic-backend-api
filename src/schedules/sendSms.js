/* eslint-disable no-constant-condition */
/* eslint-disable no-new */
/* eslint-disable space-in-parens */
/* eslint-disable no-loop-func */
/* eslint-disable array-callback-return */
/* eslint-disable no-await-in-loop */
import moment from 'moment';
import Nexmo from 'nexmo';
import { CronJob } from 'cron';
import { SettingSMS, User, ResendSMS } from '../models';

const nexmo = new Nexmo({
  apiKey: process.env.NEXTMO_KEY,
  apiSecret: process.env.NEXTMO_SECRET,
});

const opts = {
  type: 'unicode',
};

const sendSMS = async () => {
  const setting = await SettingSMS.findOne();

  if (!setting) {
    console.log('\x1b[31m', '*** PLEASE SETTING SMS SCHEDULE', '\x1b[0m');

    return null;
  }

  const { timeSend, isSend, _id, smsContent } = setting;

  if (!isSend) {
    console.log('\x1b[31m', '*** NOT SEND SMS', '\x1b[0m');
    return null;
  }

  const addMinute = moment(timeSend).add(120, 'm');

  if (moment().isBefore(timeSend) || moment().isAfter(addMinute)) {
    // do something
    // await SettingSMS.findOneAndUpdate(
    //   {
    //     _id: ObjectId(_id),
    //   },
    //   { isSend: true },
    // );
  } else {
    // send sms
    console.log('\x1b[31m', '*** SEND ALL SMS - SMS', '\x1b[0m');
    const match = {
      deletedAt: { $eq: null },
      isActive: true,
      $or: [
        {
          isSendSMS: false,
        },
      ],
    };

    let users = [];
    let skip = 0;
    const limit = 10;
    let sendSuccess = [];
    let sendFailed = [];

    while (true) {
      users = await User.find(match).skip(skip).limit(limit).select({
        _id: 1,
        phone: 1,
        code: 1,
      });

      if (users.length === 0) {
        await SettingSMS.findOneAndUpdate({ _id }, { isSend: false }, { new: true });
        break;
      }
      skip += limit;
      for (const user of users) {
        const { status, userId } = await sendESMS(user, smsContent, sendFailed, sendSuccess)
        if (status) {
          sendSuccess.push(userId);
        } else {
          sendFailed.push(userId);
        }
      }
      // await Promise.all(users.map((user) => {
      //   return new Promise((resolve) => {
      //     nexmo.message.sendSms(
      //       process.env.NEXTMO_NAME,
      //       user.phone,
      //       `${smsContent} -
      //       코드 번호: ${user.code}`,
      //       opts,
      //       (err, responseData) => {
      //         if (err) {
      //           console.log(err);
      //           sendFailed.push(user._id);
      //         } else if (responseData.messages[0].status === '0') {
      //           console.log(
      //             '\x1b[31m',
      //             '*** Message sent successfully.',
      //             '\x1b[0m',
      //           );
      //           sendSuccess.push(user._id);
      //         } else {
      //           console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
      //           sendFailed.push(user._id);
      //         }

      //         resolve();
      //       },
      //     );
      //   });
      // }));

      await Promise.all([
        User.updateMany(
          { _id: { $in: sendSuccess } },
          { isSendSMS: true, isSendSmsSuccess: true },
        ),
        User.updateMany(
          { _id: { $in: sendFailed } },
          { isSendSMS: true, isSendSmsSuccess: false },
        ),
      ]);

      sendFailed = [];
      sendSuccess = [];
    }
  }
};

const job = new CronJob({
  cronTime: '*/5 * * * * *',
  onTick: () => {
    console.log('tick');
    sendSMS();
  },
  timeZone: 'Asia/Seoul',
});

const sendESMS = (user, smsContent) => {
  return new Promise((resolve) => {
    nexmo.message.sendSms(
      process.env.NEXTMO_NAME,
      user.phone,
      `${smsContent} -
      코드 번호: ${user.code}`,
      opts,
      (err, responseData) => {
        if (err) {
          console.log(err);
          resolve({
            status: false,
            userId: user._id
          })
          createResendSMS({
            userId: user._id,
            phone: user.phone,
            code: user.code,
            smsContent,
          })
        } else if (responseData.messages[0].status === '0') {
          console.log(
            '\x1b[31m',
            '*** Message sent successfully.',
            '\x1b[0m',
          );
          resolve({
            status: true,
            userId: user._id
          })
        } else {
          console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
          resolve({
            status: false,
            userId: user._id
          })
          createResendSMS({
            userId: user._id,
            phone: user.phone,
            code: user.code,
            smsContent,
          })
        }
      },
    );
  });
}

const createResendSMS = (data) => {
  ResendSMS.create(data).catch((error) => {
    console.log('Error create resend SMS', error)
  })
}

job.start();
