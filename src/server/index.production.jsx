import fs from 'fs';
import winston from 'winston'; // eslint-disable-line import/no-extraneous-dependencies
import express from 'express'; // eslint-disable-line import/no-extraneous-dependencies
import compression from 'compression'; // eslint-disable-line import/no-extraneous-dependencies
import helmet from 'helmet'; // eslint-disable-line import/no-extraneous-dependencies
import spdy from 'spdy'; // eslint-disable-line import/no-extraneous-dependencies
import bodyParser from 'body-parser'; // eslint-disable-line import/no-extraneous-dependencies

import facebook from './facebook';
import { httpsMaxAge, cacheMaxAge, port, httpsPort, pems } from '../../configuration';

winston.cli();
const listen = portToListen => (error) => {
  if (error) {
    winston.error(error);
  } else {
    winston.info(`Listening on port ${portToListen}`);
  }
};

const key = fs.readFileSync(pems.key);
const cert = fs.readFileSync(pems.cert);

const app = express();
const secureApp = express();
const httpsApp = spdy.createServer({ key, cert }, secureApp);

app.use((request, response) => response.redirect(`https://${request.headers.host}${request.path}`));
app.listen(port, listen(port));

secureApp.use(compression({ threshold: 0 }));
secureApp.use(helmet.hsts({
  maxAge: httpsMaxAge,
  includeSubdomains: true,
  force: true,
}));
secureApp.use(bodyParser.json());

facebook(secureApp);
secureApp.use(express.static('public', { maxAge: cacheMaxAge }));

httpsApp.listen(httpsPort, listen(httpsPort));
