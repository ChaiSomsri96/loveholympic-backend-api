

import env from '../../utils/env'

const apn = require('apn');


const options = {
  cert: env.isProduction() ? `${__dirname}/pushcert.pem` : `${__dirname}/pushcert.pem`,
  key: env.isProduction() ? `${__dirname}/pushcert.pem` : `${__dirname}/pushcert.pem`,
  production: !!env.isProduction()
};


// This provider for customer push notify
const apnProvider = new apn.Provider(options);

export {
  apn,
  apnProvider
}
