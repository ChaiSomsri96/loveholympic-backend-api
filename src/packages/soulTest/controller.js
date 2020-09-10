import service from './service';
import { handleResponse } from '../../utils/response-builder';
import to from '../../utils/to';
import pick from '../../utils/pick';

/**
 *
 * @param {*} req
 * @param {*} res
 */
const updateQuestionAnswer = async (req, res) => {
  const body = pick(req.body, ['question', 'answer', 'questionCategory']);
  const [error, data] = await to(service.updateQuestionAnswer({
    ...body,
    user: req.user._id
  }));
  handleResponse(req, res, error, data);
};

const doneSoulTest = async (req, res) => {
  const [error, data] = await to(service.doneSoulTest(req.user._id));
  handleResponse(req, res, error, data);
};

const getUserAnswered = async (req, res) => {
  const [error, data] = await to(service.getListAnswerSoulTest(req.user._id));
  handleResponse(req, res, error, data);
};

const resetSoulTest = async (req, res) => {
  const [error, data] = await to(service.resetSoulTest(req.user._id));
  handleResponse(req, res, error, data);
};

const detail = async (req, res) => {
  const [error, data] = await to(service.detail(req.user._id));
  handleResponse(req, res, error, data);
};

export default {
  updateQuestionAnswer,
  doneSoulTest,
  getUserAnswered,
  resetSoulTest,
  detail,
};
