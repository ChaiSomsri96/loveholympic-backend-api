/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
import i18n from 'i18n'
import logger from '../logger'

function parseError(error) {
  console.log('error', error)
  let message = ''
  let code
  if (error.name === 'MongoError') {
    if (error.code === 11000) {
      code = error.code
      message = {
        message: i18n.__('commonLocale.dataAlreadyExisted'),
      };
    } else {
      code = {
        message: i18n.__('commonLocale.serverError')
      }
      message = error.message
    }
  } else if (error.errors) {
    const keys = Object.keys(error.errors)
    message = error.errors[keys[0]] ? error.errors[keys[0]].message : {
      message: i18n.__('commonLocale.serverError')
    }
  } else {
    message = error.message
    code = error.code
  }

  logger.error(message, { error })

  return {
    success: false,
    message,
    code
  }
}

export default {
  parseError
}
