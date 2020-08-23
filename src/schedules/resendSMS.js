/* eslint-disable no-constant-condition */
/* eslint-disable no-new */
/* eslint-disable space-in-parens */
/* eslint-disable no-loop-func */
/* eslint-disable array-callback-return */
/* eslint-disable no-await-in-loop */
import Nexmo from 'nexmo';
import { CronJob } from 'cron';
import { User, ResendSMS } from '../models';

const nexmo = new Nexmo({
  apiKey: process.env.NEXTMO_KEY,
  apiSecret: process.env.NEXTMO_SECRET,
});

const opts = {
  type: 'unicode',
};

const reSendSMS = async () => {
  // send sms
  console.log('\x1b[31m', '*** RESEND SMS - SMS', '\x1b[0m');
  let users = [];
  const skip = 0;
  const limit = 50;
  let sendSuccess = [];

  users = await ResendSMS.find({ status: 0 }).skip(skip).limit(limit);
  if (!users.length) {
    return
  }
  for (const user of users) {
    const { status, userId } = await sendESMS(user, user.smsContent)
    if (status) {
      sendSuccess.push(userId);
    }
  }
  if (sendSuccess.length) {
    await Promise.all([
      User.updateMany(
        { _id: { $in: sendSuccess } },
        { isSendSMS: true, isSendSmsSuccess: true },
      ),
      ResendSMS.updateMany({ userId: { $in: sendSuccess } }, { status: 1 })
    ]);


    sendSuccess = [];
  }
}

const job = new CronJob({
  cronTime: '*/8 * * * * *',
  onTick: () => {
    reSendSMS();
  },
  timeZone: 'Asia/Seoul',
});

const sendESMS = (user, smsContent) => {
  return new Promise((resolve) => {
    setTimeout(() => {
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
          } else if (responseData.messages[0].status === '0') {
            console.log(
              '\x1b[31m',
              '*** Message Resend sent successfully.',
              '\x1b[0m',
            );
            resolve({
              status: true,
              userId: user._id
            })
          } else {
            console.log(`Message Resend failed with error: ${responseData.messages[0]['error-text']}`);
            resolve({
              status: false,
              userId: user._id
            })
          }
        },
      );
    }, 200)
  });
}


job.start();
