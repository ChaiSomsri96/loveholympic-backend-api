import httpStatus from 'http-status';
import errorUtil from './error';

function build(success = true, data = null, meta = {}) {
  console.log({ success })
  const { code, message } = meta;
  let res = {
    data,
    message
  };

  if (code && code > 1000) {
    res = {
      ...res,
      code,
    }
  }

  return res;
}

export const handleResponse = (req, res, error, data) => {
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).jsonp(build(false, null, errorUtil.parseError(error)));
  }
  res.jsonp(build(true, data));
};

export default {
  build,
};
