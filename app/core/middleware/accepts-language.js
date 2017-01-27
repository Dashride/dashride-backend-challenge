'use strict';

function acceptsMiddleware(req, res, next) {
    let locale = req.acceptsLanguages();
    req.locale = (locale.length) ? locale[0] : 'en-US';
    next();
}

module.exports = acceptsMiddleware;
