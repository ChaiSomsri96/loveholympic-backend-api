import service from './service';
import { handleResponse } from '../../utils/response-builder';
import to from '../../utils/to';

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const list = async (req, res) => {
  const [error, data] = await to(service.list());
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const findUserLucky = async (req, res) => {
  const [error, data] = await to(service.findUserLucky(req.user._id));
  handleResponse(req, res, error, data);
};

export default {
  list,
  findUserLucky,
};
