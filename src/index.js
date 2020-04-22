/* eslint-disable no-underscore-dangle */
import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import { EventEmitter } from 'events';
import express from 'express';
import ev from 'express-validation';
import helmet from 'helmet';
import i18n from 'i18n';
import methodOverride from 'method-override';
import morgan from 'morgan';
import init from './init';
import logger from './logger';
import multiCores from './multi-cores';
import route from './routes';
import env from './utils/env';
import errorUtil from './utils/error';
import responseBuilder from './utils/response-builder';
import { locale, getContentLanguage, localeList } from './locales/i18n';

const mediator = new EventEmitter();
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(compress());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(helmet());

if (env.isDevelopment()) {
  app.use(express.static(process.cwd()));
  app.get('/', (req, res) => {
    res.status(401).jsonp({ error: 401 });
  });
}

multiCores(app, mediator);

i18n.configure({
  locales: localeList,
  directory: `${__dirname}/locales`,
  defaultLocale: locale.en,
  cookie: 'lang',
  autoReload: false,
  updateFiles: false,
  objectNotation: true,
  api: {
    __: 't',
  },
});
app.use(i18n.init);

app.use('*', (req, res, next) => {
  const locales = i18n.getLocales();
  const language = getContentLanguage(req, locales);
  i18n.setLocale(language);

  next();
});

mediator.once('boot.ready', async () => {
  console.log('SERVER BOOT READY');
  await init(app);

  app.use(route());
  app.use(handleNotFoundError);
  app.use(handleValidationError);
});

function handleNotFoundError(req, res) {
  console.log('404', req.url);
  logger.info({
    data: {
      url: `404 - ${req.method.toUpperCase()} ${req.url}`,
      clientData: ['get', 'delete'].includes(req.method.toLowerCase())
        ? req.query
        : req.body,
    },
  });
  return res.status(404).jsonp(responseBuilder.build(
    false,
    null,
    errorUtil.parseError({
      message: i18n.__('apiNotFound'),
    })
  ));
}

// eslint-disable-next-line no-unused-vars
function handleValidationError(error, req, res, _) {
  if (error instanceof ev.ValidationError) {
    return res.status(error.status).jsonp(responseBuilder.build(
      false,
      null,
      {
        code: error.status,
        message: error.errors[0].messages[0]
          .split('"')
          .join('')
          .split('undefined')
          .join(''),
      }
    ));
  } else {
    console.log('500', error);
    logger.info({
      data: {
        url: `500 - ${req.method.toUpperCase()} ${req.url}`,
        clientData: ['get', 'delete'].includes(req.method.toLowerCase())
          ? req.query
          : req.body,
      },
    });
    return res.status(500).jsonp(responseBuilder.build(
      false,
      null,
      errorUtil.parseError({
        message: i18n.__('common.serverError'),
      })
    ));
  }
}

export default app;
