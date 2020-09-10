import { Router } from 'express';
import authenticator from '../middlewares/authenticator'

/**
 * for admin
 */
import adminAccountRoute from '../packages/adminAccounts/route';
import adminBannerRoute from '../packages/adminBanners/route';
import adminCommentRoute from '../packages/adminComment/route';
import adminQuestionAnswerRoute from '../packages/adminQuestionAnswer/route';
import adminNotificationSystemRoute from '../packages/adminNotificationSystem/route';
import adminSettingSystemRoute from '../packages/adminSettingSystem/route';
import adminGoldenTicketRoute from '../packages/adminGoldenTicket/route';
import adminUser from '../packages/adminUser/route';
import adminReport from '../packages/adminReport/route';
import adminSettingSMS from '../packages/adminSettingSMS/route';

/**
 * for user
 */
import userRoute from '../packages/user/route';
import bannerRoute from '../packages/banner/route';
import imageRoute from '../packages/image/route';
import notificationSystemRoute from '../packages/notificationSystem/route';
import commentRoute from '../packages/comment/route';
import questionCategoryRoute from '../packages/questionCategory/route';
import luffingTestRoute from '../packages/luffingTest/route';
import settingSystemRoute from '../packages/settingSystem/route';
import userHolympicRoute from '../packages/userHolympic/route';
import userMatchRoute from '../packages/userMatch/route';
import notificationRoute from '../packages/notification/route';
import goldenTicketRoute from '../packages/goldenTicket/route';
import soulTestRoute from '../packages/soulTest/route';
import reportRoute from '../packages/report/route';

import commonRoute from '../packages/settingSystem/common';

export default () => {
  const api = Router();

  api.use('*', authenticator);

  api.use('/admin', adminAccountRoute);
  api.use('/admin/banners', adminBannerRoute);
  api.use('/admin/comments', adminCommentRoute);
  api.use('/admin/questions', adminQuestionAnswerRoute);
  api.use('/admin/notification-systems', adminNotificationSystemRoute);
  api.use('/admin/setting', adminSettingSystemRoute);
  api.use('/admin/golden-ticket', adminGoldenTicketRoute);
  api.use('/admin/users', adminUser);
  api.use('/admin/report', adminReport);
  api.use('/admin/sms', adminSettingSMS);

  api.use('/users', userRoute);
  api.use('/banners', bannerRoute);
  api.use('/upload-s3', imageRoute);
  api.use('/notification-systems', notificationSystemRoute);
  api.use('/comments', commentRoute);
  api.use('/questions', questionCategoryRoute);
  api.use('/luffing-test', luffingTestRoute);
  api.use('/setting-system', settingSystemRoute);
  api.use('/user-holympic', userHolympicRoute);
  api.use('/user-matching', userMatchRoute);
  api.use('/notifications', notificationRoute);
  api.use('/golden-ticket', goldenTicketRoute);
  api.use('/soul-test', soulTestRoute);
  api.use('/report', reportRoute);

  api.use('/check_status', commonRoute);
  api.use('/admin/check_status', commonRoute);

  return api;
};
