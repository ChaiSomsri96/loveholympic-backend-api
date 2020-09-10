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
  const [error, data] = await to(service.list());
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const listUserLucky = async (req, res) => {
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const [error, data] = await to(service.listUserLucky(options));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const listUser = async (req, res) => {
  const [error, data] = await to(service.listUser(req.query));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const create = async (req, res) => {
  const options = pick(req.body, [
    'timeFrom',
    'timeTo',
    'imageGlobal',
    'tickets',
    'isDel',
  ]);
  const [error, data] = await to(service.create(options));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const update = async (req, res) => {
  const options = pick(req.body, [
    'image',
    'users',
    'random',
    'imageLucky',
    'name',
  ]);
  const [error, data] = await to(service.update({
    ...options,
    goldenTicketId: req.params.id,
  }));
  handleResponse(req, res, error, data);
};

export default {
  list,
  create,
  update,
  listUser,
  listUserLucky,
};
