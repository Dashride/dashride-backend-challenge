'use strict';

const constants = require('shared/constants');

module.exports = function handleErrors(err, req, res, next) {
    req.log.error(err);
    res.status(constants.http.status.INTERNAL_SERVER_ERROR).json(err);
};
