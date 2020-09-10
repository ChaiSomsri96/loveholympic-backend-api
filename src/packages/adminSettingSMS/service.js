/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
import Nexmo from 'nexmo';
import { SettingSMS, User } from '../../models';
import { ObjectId } from '../../utils/mongoose';

const nexmo = new Nexmo({
  apiKey: process.env.NEXTMO_KEY,
  apiSecret: process.env.NEXTMO_SECRET,
});

const opts = {
  type: 'unicode',
};

/**
 *
 * @param {*}
 * @returns
 */
const create = async (body) => {
  let data = await SettingSMS.findOne();

  if (data) {
    data = await SettingSMS.findOneAndUpdate(
      { _id: data._id },
      {
        ...body,
        isSend: true,
      },
      {
        new: true,
      },
    );
  } else {
    data = await SettingSMS.create({
      ...body,
      isSend: true,
    });
  }

  return data;
};

/**
 *
 * @param {*}
 * @returns
 */
const getDetail = async () => {
  const settingSMS = await SettingSMS.findOne();

  return settingSMS;
};

/**
 *
 * @param {*}
 * @returns
 */
const sendUser = async (body) => {
  const { users, smsContentUser } = body;
  const setting = await SettingSMS.findOne({});
  if (setting) {
    setting.smsContentUser = smsContentUser;
    await setting.save();
  } else {
    await SettingSMS.create({ smsContentUser });
  }

  for (let i = 0; i < users.length; i++) {
    const id = users[i];
    const user = await User.findOne({ _id: ObjectId(id) }).select({
      _id: 1,
      phone: 1,
      code: 1,
    });

    // 84397916836
    if (user) {
      return nexmo.message.sendSms(
        process.env.NEXTMO_NAME,
        '84858768089',
        `${smsContentUser} -
        코드 번호: ${user.code}`,
        opts,
        async (err, responseData) => {
          if (err) {
            console.log(err);
          } else if (responseData.messages[0].status === '0') {
            console.log('Message sent successfully.');
            console.log({ id });
            await User.findOneAndUpdate(
              { _id: ObjectId(id) },
              { isSendSmsSuccess: true, isSendSMS: true },
              { new: true },
            );
          } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
          }
        },
      );
    }
  }

  return null;
};

export default {
  create,
  getDetail,
  sendUser,
};
