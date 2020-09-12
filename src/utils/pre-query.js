/* eslint-disable no-underscore-dangle */
import i18n from 'i18n';
import httpStatus from 'http-status';
import responseBuilder from './response-builder'
import validation from './validation'
import stringUtil from './stringUtil'
import { Banner, NotificationSystem, Comment, AdminComment } from '../models'

function query(req, res, next, _id, Model, message) {
  if (!validation.isObjectId(_id)) {
    return res.status(httpStatus.BAD_REQUEST).jsonp(responseBuilder.build(false, {}, { message }))
  }

  Model.findOne({ _id }, (error, doc) => {
    if (error || !doc) {
      res.status(httpStatus.NOT_FOUND).jsonp(responseBuilder.build(false, {}, { message }))
    } else {
      req[`${stringUtil.lowerCaseFirstLetter(Model.modelName)}Data`] = doc
      next()
    }
  })
}

const banner = (req, res, next, _id) => {
  query(req, res, next, _id, Banner, i18n.__('common.recordNotFound'))
}

const notificationSystem = (req, res, next, _id) => {
  query(req, res, next, _id, NotificationSystem, i18n.__('common.recordNotFound'))
}

const comment = (req, res, next, _id) => {
  query(req, res, next, _id, Comment, i18n.__('common.recordNotFound'))
}

const adminComment = (req, res, next, _id) => {
  query(req, res, next, _id, AdminComment, i18n.__('common.recordNotFound'))
}

export default {
  banner,
  notificationSystem,
  comment,
  adminComment
}
