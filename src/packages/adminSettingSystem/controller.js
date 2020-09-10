import pick from '../../utils/pick';
import { handleResponse } from '../../utils/response-builder';
import to from '../../utils/to';
import service from './service';

/**
 *
 * @param {*} req
 * @param {*} res
 */
const index = async (req, res) => {
  const [error, data] = await to(service.getSetting());
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const create = async (req, res) => {
  const body = pick(req.body, [
    'iconNotificationSystem',
    'youtubeHistoryURL',
    'loholGoodsURL',
    'notificationSystemId',
    'startEndGoldenTicket',
  ]);
  const [error, data] = await to(service.create(body));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const configSystem = async (req, res) => {
  const body = pick(req.body, [
    'timeFrom',
    'timeTo',
    'isOpenCloseLoveHolympic',
  ]);
  const [error, data] = await to(service.configSystem(body));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const resetAllData = async (req, res) => {
  const [error, data] = await to(service.resetAllData());
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const resetDataTest = async (req, res) => {
  const [error, data] = await to(service.resetDataTest());
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const sendAllSms = async (req, res) => {
  const [error, data] = await to(service.sendAllSms());
  handleResponse(req, res, error, data);
};

export default {
  index,
  create,
  configSystem,
  resetAllData,
  resetDataTest,
  sendAllSms,
};
