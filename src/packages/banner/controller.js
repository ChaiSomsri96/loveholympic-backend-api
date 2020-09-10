import service from './service';
import { handleResponse } from '../../utils/response-builder';
import to from '../../utils/to';
import pick from '../../utils/pick';

/**
 *
 * @param {*} req
 * @param {*} res
 */
const index = async (req, res) => {
  const options = pick(req.query, [
    'sortBy',
    'limit',
    'page',
    'sortType',
    'type',
  ]);
  const [error, data] = await to(service.list(options));
  handleResponse(req, res, error, data);
};

export default {
  index,
};
