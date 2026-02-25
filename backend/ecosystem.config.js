const path = require('node:path');

require('dotenv').config({
  path: path.resolve(process.cwd(), '../.env.deploy'),
});

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH_BACKEND, DEPLOY_REPO, DEPLOY_REF } = process.env;

module.exports = {
  apps: [
    {
      name: 'api-service',
      script: './dist/app.js',
    },
  ],

  // Настройка деплоя
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH_BACKEND,
      'pre-deploy-local': `scp ./*.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH_BACKEND}/current/backend`,
      'post-deploy':
        'cd backend && npm ci && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
