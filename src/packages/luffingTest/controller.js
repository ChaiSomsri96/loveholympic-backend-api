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

const finishLuffingTest = async (req, res) => {
  const [error, data] = await to(service.finishLuffingTest(req.user._id));
  handleResponse(req, res, error, data);
};

const luffingTestDetail = async (req, res) => {
  const [error, data] = await to(service.luffingTestDetail(req.user._id));
  handleResponse(req, res, error, data);
};

const getUserAnswered = async (req, res) => {
  const [error, data] = await to(service.getListAnswerLuffingTest(req.user._id));
  handleResponse(req, res, error, data);
};

const resetLuffingTest = async (req, res) => {
  const [error, data] = await to(service.resetLuffingTest(req.user._id));
  handleResponse(req, res, error, data);
};

export default {
  updateQuestionAnswer,
  finishLuffingTest,
  luffingTestDetail,
  getUserAnswered,
  resetLuffingTest,
};
