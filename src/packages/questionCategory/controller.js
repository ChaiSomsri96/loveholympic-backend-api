import service from './service';
import { handleResponse } from '../../utils/response-builder';
import to from '../../utils/to';

/**
 *
 * @param {*} req
 * @param {*} res
 */
const index = async (req, res) => {
  const [error, data] = await to(service.list());
  handleResponse(req, res, error, data);
};

const getSoulTest = async (req, res) => {
  const [error, data] = await to(service.listSoulTest());
  handleResponse(req, res, error, data);
};

export default {
  index,
  getSoulTest,
};
