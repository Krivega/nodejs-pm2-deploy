const path = require('node:path');

require('dotenv').config({
  path: path.resolve(process.cwd(), '../.env.deploy'),
});

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REPO, DEPLOY_REF } = process.env;

module.exports = {
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp -Cr .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/current/frontend`,
      'post-deploy': 'cd frontend && npm ci && npm run build',
    },
  },
};
