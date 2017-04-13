import winston from 'winston'; // eslint-disable-line import/no-extraneous-dependencies
import express from 'express'; // eslint-disable-line import/no-extraneous-dependencies
import bodyParser from 'body-parser'; // eslint-disable-line import/no-extraneous-dependencies
import proxy from 'http-proxy-middleware'; // eslint-disable-line import/no-extraneous-dependencies

import facebook from './facebook';
import configuration from '../../configuration';

winston.cli();
const listen = portToListen => (error) => {
  if (error) {
    winston.error(error);
  } else {
    winston.info(`Listening on port ${portToListen}`);
  }
};

const app = express();
app.use(bodyParser.json());

facebook(app);
app.use(proxy({ target: 'http://localhost:3001', changeOrigin: true }));

app.listen(configuration.port, listen(configuration.port));
