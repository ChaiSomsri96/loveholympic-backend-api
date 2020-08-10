/**
 * Load app config
 */
const env = process.env.NODE_ENV || 'development';
let config;

switch (env) {
  case 'production':
    config = require('./env.prod').default;
    break;
  case 'staging':
    config = require('./env.stg').default;
    break;
  default:
    config = require('./env.dev').default;
    break;
}

export default Object.assign({}, config);
