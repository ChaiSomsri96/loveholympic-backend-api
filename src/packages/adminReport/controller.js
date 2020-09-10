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
    'userId',
    'reporterId',
  ]);
  const [error, data] = await to(service.create(body));
  handleResponse(req, res, error, data);
};

const list = async (req, res) => {
  const options = pick(req.query, [
    'sortBy',
    'limit',
    'page',
    'sortType',
    'search',
    'status',
  ]);
  const [error, data] = await to(service.list(options));
  handleResponse(req, res, error, data);
};

const block = async (req, res) => {
  const [error, data] = await to(service.block(req.body));
  handleResponse(req, res, error, data);
};

export default {
  create,
  list,
  block,
}
