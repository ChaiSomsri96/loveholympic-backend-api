import to from '../../utils/to';
import service from './service';
import { handleResponse } from '../../utils/response-builder';
import pick from '../../utils/pick';

const destroy = async (req, res) => {
  const [error] = await to(service.destroy(req.params.id));
  handleResponse(req, res, error, { success: true });
};


const deleteReply = async (req, res) => {
  const [error] = await to(service.deleteReply(req.params.id, req.body.idParent));
  handleResponse(req, res, error, { success: true });
};

const list = async (req, res) => {
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const [error, data] = await to(service.list({ ...options, notificationId: req.params.id }));
  handleResponse(req, res, error, data);
};

const replyComment = async (req, res) => {
  const options = pick(req.body, ['content', 'notificationId', 'commentId']);
  const [error, data] = await to(service.replyComment(options));
  handleResponse(req, res, error, data);
};

export default {
  destroy,
  list,
  replyComment,
  deleteReply,
};
