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
  const [error, data] = await to(service.list({
    ...options,
    userId: req.user._id,
  }));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const accepted = async (req, res) => {
  const [error, data] = await to(service.accepted({
    id: req.params.id,
    userId: req.user._id,
  }));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const rejected = async (req, res) => {
  const [error, data] = await to(service.rejected({
    id: req.params.id,
    userId: req.user._id,
  }));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const chatSharePhone = async (req, res) => {
  const body = pick(req.body, ['userChatId', 'phone'])
  const [error, data] = await to(service.chatSharePhone({
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
const chatRejectPhone = async (req, res) => {
  const body = pick(req.body, ['userChatId']);
  const [error, data] = await to(service.chatRejectPhone({
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
const detail = async (req, res) => {
  const [error, data] = await to(service.detail(req.params.id));
  handleResponse(req, res, error, data);
};

export default {
  list,
  accepted,
  rejected,
  chatSharePhone,
  chatRejectPhone,
  detail,
};
