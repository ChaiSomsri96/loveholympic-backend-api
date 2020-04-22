/* eslint no-multi-str: [0] */
const APP_NAME = 'FestFive';
const PATH = '/home/ubuntu/festfive';
const USER = 'ubuntu';
const REPO = 'git@gitlab.com:tc-fest-five/fest-five-api.git';

const IP = '3.37.1.104';
const PORT = '22';
const BRANCH_PROD = 'origin/srv_backend';

const DEV_IP = '13.212.53.195';
const DEV_PORT = '22';
const DEV_BRANCH = 'origin/develop';

const POST_DEPLOY = {
  PROD:
    'ln -nfs ../shared/.env .env && \
          npm install --production && \
          pm2 reload ecosystem.config.js',
  DEV:
    'ln -nfs ../shared/.env .env && \
          npm install && \
          pm2 reload ecosystem.config.js',
};

module.exports = {
  apps: [
    {
      name: APP_NAME,
      script: './app.js',
      instances: 'max',
      wait_ready: true,
      exec_mode: 'cluster',
    },
  ],

  deploy: {
    dev: {
      user: USER,
      host: [
        {
          host: DEV_IP,
          port: DEV_PORT,
        },
      ],
      ref: DEV_BRANCH,
      repo: REPO,
      path: PATH,
      'post-deploy': POST_DEPLOY.DEV,
    },
    prod: {
      user: USER,
      host: [
        {
          host: IP,
          port: PORT,
        },
      ],
      ref: BRANCH_PROD,
      repo: REPO,
      path: PATH,
      'post-deploy': POST_DEPLOY.PROD,
    },
  },
};
