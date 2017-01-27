'use strict';

require('app-module-path').addPath(__dirname);

const SERVER_PORT = process.env.PORT || 3000;

const express = require('express');
const helmet = require('helmet');
const bunyanMiddleware = require('bunyan-middleware');
const methodOverride = require('method-override');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');
const cors = require('cors');

const logger = require('shared/logger');
const acceptsLanguage = require('core/middleware/accepts-language');
const mainRouter = require('./router');

const app = express();

app.use(bunyanMiddleware({
    headerName: 'X-Request-Id',
    propertyName: 'reqId',
    logName: 'req_id',
    obscureHeaders: [],
    logger: logger
}));

app.use(helmet());
app.set('trust proxy', 'loopback');

app.use(cors({ origin: '*' }));
app.use(bodyParser.json({ limit: '256kb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '256kb' }));
app.use(acceptsLanguage);
app.use(methodOverride());
app.use(errorHandler({ dumpExceptions: false, showStack: true }));

app.use(mainRouter);

// Start the server, otherwise exit with error.
Promise.resolve(require('core/db')).then(function startApp() {
    app.listen(SERVER_PORT, '0.0.0.0', (err) => {
        if (err) {
            logger.error(err);
            throw err;
        }

        logger.info('==> Listening on port %s.', SERVER_PORT);
    });
}).catch(function(err) {
    logger.error(err.name, err.message);
    process.exit(1);
});

module.exports = app;
