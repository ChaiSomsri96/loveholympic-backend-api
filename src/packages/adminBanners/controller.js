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
 * @returns
 */
const detail = async (req, res) => {
  const options = pick(req.params, ['id']);
  const [error, data] = await to(service.detail(options));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const create = async (req, res) => {
  const body = pick(req.body, [
    'image',
    'description',
    'isActive',
    'position',
    'type',
  ]);
  const [error, data] = await to(service.create(body));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const createImageManage = async (req, res) => {
  const body = pick(req.body, ['images', 'idsDel', 'loholGoodsURL']);
  const [error, data] = await to(service.createImageManage(body));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const edit = async (req, res) => {
  const body = pick(req.body, [
    'image',
    'description',
    'isActive',
    'position',
    'type',
  ]);
  const [error, data] = await to(service.edit({
    ...body,
    bannerId: req.params.id,
  }));
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

export default {
  list,
  create,
  destroy,
  detail,
  edit,
  createImageManage,
};
