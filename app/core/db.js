'use strict';

const mongoose = require('mongoose');
const logger = require('shared/logger').child({ module: 'db' });

// Set internal promise object to be the native Promise object
mongoose.Promise = global.Promise;
const mongoHost = process.env.MONGO_HOST || 'localhost';
const mongoPort = process.env.MONGO_PORT || 27017;
const mongoDBName = process.env.MONGO_DB_NAME || 'dr-challenge';

let mongoAuth = '';

if (process.env.MONGO_USER && process.env.MONGO_PASS) {
    mongoAuth = `${process.env.MONGO_USER}:${process.env.MONGO_PASS}@`;
}

let mongoURI = `mongodb://${mongoAuth}${mongoHost}:${mongoPort}/${mongoDBName}`;

mongoose.connect(mongoURI, {
    server: {
        auto_reconnect: true,
        socketOptions: {
            keepAlive: 1
        },
    },
});

const conn = mongoose.connection;

// When the connection is disconnected
conn.on('disconnected', function() {
    logger.warn('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    conn.close(function() {
        logger.warn('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

module.exports = new Promise(function(resolve, reject) {
    // When successfully connected
    conn.on('connected', function() {
        logger.info('Mongoose default connection open to %s', conn.name);
        resolve(conn);
    });

    // If the connection throws an error
    conn.on('error', function(err) {
        logger.fatal('Mongoose default connection error: ' + err);
        reject(err);
    });
});
