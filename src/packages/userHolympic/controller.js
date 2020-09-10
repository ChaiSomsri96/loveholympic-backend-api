import { pick } from 'lodash';
import to from '../../utils/to';
import services from './service';
import { handleResponse } from '../../utils/response-builder';

/**
 *
 * @param {*} req
 * @param {*} res
 */
const create = async (req, res) => {
  const body = pick(req.body, [
    'gender',
    'age',
    'area',
    'hobbies',
    'personalities',
    'type',
  ]);
  const [error, data] = await to(services.create({
    ...body,
    userId: req.user._id,
  }));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const verify = async (req, res) => {
  const body = pick(req.query, ['type'])
  const [error, data] = await to(services.verify({
    userId: req.user._id,
    ...body,
  }));
  handleResponse(req, res, error, data);
};

export default {
  create,
  verify,
};
