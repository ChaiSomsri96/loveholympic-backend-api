import validate from 'express-validation';

import admin from './adminAccounts/validator';
import adminComment from './adminComment/validator';
import settingSystem from './adminSettingSystem/validator';
import adminUser from './adminUser/validator';

import questionCategory from './questionCategory/validator';
import luffingTest from './luffingTest/validator';
import userHolympic from './userHolympic/validator';
import userMatch from './userMatch/validator';
import notifications from './notification/validator';
import goldenTicket from './goldenTicket/validator';
import banner from './banner/validator';
import notificationSystem from './notificationSystem/validator';
import image from './image/validator';
import comment from './comment/validator';
import user from './user/validator';
import report from './report/validator';

function parse(object) {
  const data = {};
  for (const key of Object.keys(object)) {
    data[key] = validate(object[key]);
  }
  return data;
}

export default {
  user: parse(user),
  admin: parse(admin),
  banner: parse(banner),
  notificationSystem: parse(notificationSystem),
  image: parse(image),
  comment: parse(comment),
  adminComment: parse(adminComment),
  questionCategory: parse(questionCategory),
  settingSystem: parse(settingSystem),
  luffingTest: parse(luffingTest),
  userHolympic: parse(userHolympic),
  userMatch: parse(userMatch),
  notifications: parse(notifications),
  goldenTicket: parse(goldenTicket),
  adminUser: parse(adminUser),
  report: parse(report),
};
