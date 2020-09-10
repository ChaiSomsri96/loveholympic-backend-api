import to from '../../utils/to';
import services from './service';
import { handleResponse } from '../../utils/response-builder';
import pick from '../../utils/pick';

/**
 *
 * @param {*} req
 * @param {*} res
 */
const findUserMatching = async (req, res) => {
  const [error, data] = await to(services.findUserMatching({
    userId: req.user._id,
  }));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const findSoulFriend = async (req, res) => {
  const [error, data] = await to(services.findSoulFriend({
    userId: req.user._id,
  }));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const nextMatchRound = async (req, res) => {
  const body = pick(req.body, ['match', 'round', 'userSelectedId']);
  const [error, data] = await to(services.nextMatchRound({
    userId: req.user._id,
    ...body,
  }));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const finalRealHolympic = async (req, res) => {
  const body = pick(req.body, ['userSelectedId']);
  const [error, data] = await to(services.finalRealHolympic({
    userId: req.user._id,
    ...body,
  }));
  handleResponse(req, res, error, data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const resetMatching = async (req, res) => {
  const [error, data] = await to(services.resetUserMatching(req.user._id));
  handleResponse(req, res, error, data);
};

export default {
  findUserMatching,
  nextMatchRound,
  finalRealHolympic,
  resetMatching,
  findSoulFriend,
};
