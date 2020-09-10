import service from './service';
import { handleResponse } from '../../utils/response-builder';
import to from '../../utils/to';
import pick from '../../utils/pick';

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const list = async (req, res) => {
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const [error, data] = await to(service.list(options));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const create = async (req, res) => {
  const body = pick(req.body, [
    'title',
  ]);
  const [error, data] = await to(service.create(body));
  handleResponse(req, res, error, data);
};

/**
 *
 */
const destroy = async (req, res) => {
  const body = pick(req.params, ['id']);
  const [error, data] = await to(service.destroy(body));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
async function update(req, res) {
  const [error, data] = await to(service.update(req.params.id, req.body));
  handleResponse(req, res, error, data);
}

export default {
  list,
  create,
  destroy,
  update,
};
