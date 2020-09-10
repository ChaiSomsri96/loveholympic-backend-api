import pick from '../../utils/pick';
import { handleResponse } from '../../utils/response-builder';
import to from '../../utils/to';
import service from './service';

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const list = async (req, res) => {
  const options = pick(req.query, [
    'sortBy',
    'limit',
    'page',
    'sortType',
    'search',
    'statusSms'
  ]);
  const [error, data] = await to(service.list(options));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getUserManagement = async (req, res) => {
  const options = pick(req.query, [
    'sortBy',
    'limit',
    'page',
    'sortType',
    'search',
    'gender',
    'type',
    'ranking',
    'totalHeart',
    'luffingTest',
    'isGoldenTicket',
    'rankingFrom',
    'rankingTo',
  ]);
  const [error, data] = await to(service.getUserManagement(options));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const destroy = async (req, res) => {
  const options = pick(req.body, ['deleteFlag', 'ids']);
  const [error, data] = await to(service.destroy(options));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const importCode = async (req, res) => {
  const [error, data] = await to(service.importCode(req));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const userDetail = async (req, res) => {
  const body = pick(req.params, ['id'])
  const [error, data] = await to(service.userDetail(body));
  handleResponse(req, res, error, data);
};

export default {
  list,
  destroy,
  importCode,
  getUserManagement,
  userDetail,
};
