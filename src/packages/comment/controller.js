import to from '../../utils/to';
import service from './service';
import { handleResponse } from '../../utils/response-builder';
import pick from '../../utils/pick';

const create = async (req, res) => {
  const body = pick(req.body, ['notificationSystem', 'content']);
  const { _id: userId } = req.user;
  const [error, data] = await to(service.create({
    userId,
    ...body,
  }));
  handleResponse(req, res, error, data);
};

const show = async (req, res) => {
  const [error, data] = await to(service.show(req.params.id));
  handleResponse(req, res, error, data);
};

const likeAndUnlikeComment = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const [error, data] = await to(service.likeAndUnlikeComment({
    id,
    userId,
  }));
  handleResponse(req, res, error, data);
};

const destroy = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const [error, data] = await to(service.destroy({
    id,
    userId,
  }));
  handleResponse(req, res, error, null, { data, message: 'delete success' });
};

export default {
  create,
  show,
  likeAndUnlikeComment,
  destroy,
};
