/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import request from 'request'

const smsGateway = process.env.SMS_GATEWAY
const username = process.env.SMS_USER_NAME
const password = process.env.SMS_PASSWORD
const senderId = process.env.SMS_SENDER_ID


const sendSMSGateway = async (toPhoneNumber, codeVerify) => {
  return new Promise((resolve, reject) => {
    const to = formatPhoneWithoutPlus(toPhoneNumber)
    const text = `${codeVerify} is your validation code for Keno. Please insert this number in the app to validate your mobile number.`
    const url = `${smsGateway}?username=${username}&password=${password}&senderid=${senderId}&to=${to}&text=${text}`
    request(url, (err, response, body) => {
      if (err) {
        console.log(`Error send sms: ${err}`);
        return reject(err)
      }
      resolve(true)
    })
  })
}

function formatPhoneWithoutPlus(phone) {
  if (!phone) {
    return ''
  }
  if (phone.charAt(0) === '+') {
    phone = phone.substring(1, phone.length)
  }

  return phone
}

module.exports = {
  sendSMSGateway
}
