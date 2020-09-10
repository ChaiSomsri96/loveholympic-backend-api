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
const loholGood = async (req, res) => {
  const [error, data] = await to(service.loholGood());
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const verifyTimeSystem = async (req, res) => {
  const [error, data] = await to(service.verifyTimeSystem());
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
  ]);
  const [error, data] = await to(service.create(body));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const checkStatus = async (req, res) => {
  const [error, data] = await to(service.checkStatus());
  handleResponse(req, res, error, data);
};

export default {
  index,
  create,
  loholGood,
  verifyTimeSystem,
  checkStatus,
};
