/* eslint-disable no-underscore-dangle */
import i18n from 'i18n';
import httpStatus from 'http-status';
import _ from 'lodash';
import service from './service';
import to from '../../utils/to';
import upload from '../../utils/multer';
import responseBuilder, { handleResponse } from '../../utils/response-builder';

/**
 *
 * @param {*} req
 * @param {*} res
 */
const uploadImage = async (req, res) => {
  upload.array('image')(req, res, async (err) => {
    if (err) {
      return handleResponse(req, res, err, {});
    }
    if (req.invalidFile) {
      const message = i18n.__('upload.invalidMediaUpload');
      return res
        .status(httpStatus.BAD_REQUEST)
        .jsonp(responseBuilder.build(false, {}, { message }));
    }
    if (_.isEmpty(req.files)) {
      const message = i18n.__('upload.required');
      return res
        .status(httpStatus.BAD_REQUEST)
        .jsonp(responseBuilder.build(false, {}, { message }));
    } else {
      const [error, data] = await to(service.uploadImage(req.files, req.user._id));
      return handleResponse(req, res, error, data[0]);
    }
  });
};

export default {
  uploadImage,
};
