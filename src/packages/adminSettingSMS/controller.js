import service from './service';
import pick from '../../utils/pick';
import { handleResponse } from '../../utils/response-builder';
import to from '../../utils/to';

/**
 *
 * @param {*}
 * @returns
 */
const create = async (req, res) => {
  const body = pick(req.body, [
    'smsContent',
    'timeSend',
  ]);
  const [error, data] = await to(service.create(body));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const sendUser = async (req, res) => {
  const body = pick(req.body, ['smsContentUser', 'users']);
  const [error, data] = await to(service.sendUser(body));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*}
 * @returns
 */
const getDetail = async (req, res) => {
  const [error, data] = await to(service.getDetail());
  handleResponse(req, res, error, data);
};

export default {
  create,
  getDetail,
  sendUser,
};
