/* eslint-disable import/first */
/* eslint-disable no-underscore-dangle */
import UserReport from '../adminReport/model';
import i18n from 'i18n';
/**
 *
 * @param {*}
 * @returns
 */
const create = async (body) => {
  const exitReport = await UserReport.findOne({
    userId: body.userId,
    reporterId: body.reporterId
  })
  if (!exitReport) {
    const report = await UserReport.create(body);
    return report;
  } else {
    throw new Error(JSON.stringify({
      message: i18n.__('User was report'),
    }));
  }
}


export default {
  create
}
