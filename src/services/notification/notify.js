/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import i18n from 'i18n';

// import socketUtil from '../../utils/socket-io'
import { localeMessage } from '../fireBaseService'

const socketUtil = require('../../utils/socket-io')

/**
 *
 * @param {*} event topic, event listen
 * @param {*} msgLocale message constant locale i18n
 * @param {*} customerId
 * @param {*} data data {
 *              type:'CHANGED_ORDER_STATUS',
 *              message: ''
 *              data:{}
 *            }
 * @param {*} schema schema model name to query reference
 * @param {*} prefixName or surfixName it mean action by or action to
 */
const notifyToCustomer = function (event, userlocale, msgLocale, customerId, data, prefixName) {
  // SOCKET
  const result = {
    type: event,
    message: localeMessage(msgLocale, prefixName, userlocale),
    data
  }
  socketUtil.touser(customerId, event, result)
}

/**
 *
 * @param {*} event topic, event listen
 * @param {*} msgLocale message constant locale i18n
 * @param {*} customerId
 * @param {*} data data {
 *              type:'CHANGED_ORDER_STATUS',
 *              message: ''
 *              data:{}
 *            }
 * @param {*} userlocale user locale
 * @param {*} prefixName or surfixName it mean action by or action to
 */
const notifyToStaff = function (event, userlocale, msgLocale, userId, data, prefixName) {
  // SOCKET
  const result = {
    type: event,
    message: localeMessage(msgLocale, prefixName, userlocale),
    data
  }
  socketUtil.touser(userId, event, result)
}

/**
 *
 * @param {*} event topic, event listen
 * @param {*} msgLocale message constant locale i18n
 * @param {*} customerId
 * @param {*} data data {
 *              type:'CHANGED_ORDER_STATUS',
 *              message: ''
 *              data:{}
 *            }
 * @param {*} schema user locale
 * @param {*} prefixName or surfixName it mean action by or action to
 */
const notifyToAdManager = function (event, userlocale, msgLocale, userId, data, prefixName) {
  // SOCKET
  const result = {
    type: event,
    message: localeMessage(msgLocale, prefixName, userlocale),
    data
  }
  socketUtil.touser(userId, event, result)
}


const getUserName = function (user) {
  if (!user) {
    return ''
  }
  if (user.cleaner_first_name) {
    return `${user.cleaner_first_name} ${user.cleaner_last_name}`
  }
  if (user.cust_first_name) {
    return `${user.cust_first_name} ${user.cust_last_name}`
  }
}


export {
  notifyToCustomer,
  notifyToStaff,
  notifyToAdManager,
  getUserName
}

