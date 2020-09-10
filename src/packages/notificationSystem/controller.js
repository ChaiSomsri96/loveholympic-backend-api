import service from './service';
import to from '../../utils/to';
import { handleResponse } from '../../utils/response-builder';
import pick from '../../utils/pick';

const index = async (req, res) => {
  const [error, data] = await to(service.index(req.query));
  handleResponse(req, res, error, data);
};

const show = async (req, res) => {
  const { _id: userId } = req.user;
  const { id } = req.params;
  const [error, data] = await to(service.detail({
    id,
    userId,
  }));
  handleResponse(req, res, error, data);
};

const likeAndUnlike = async (req, res) => {
  const { _id: userId } = req.user;
  const { id } = req.params;
  const [error, data] = await to(service.likeAndUnlikeNotification({
    id,
    userId,
  }));
  handleResponse(req, res, error, data);
};

const listComment = async (req, res) => {
  const { _id: userId } = req.user;
  const { id } = req.params;
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const [error, data] = await to(service.listComment({
    id,
    userId,
    ...options,
  }));
  handleResponse(req, res, error, data);
};

export default {
  index,
  show,
  likeAndUnlike,
  listComment,
};
