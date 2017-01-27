'use strict';

const express = require('express');
const router = express.Router();
const logger = require('shared/logger').child({ module: 'ping' });

router.get('/ping', function(req, res) {
    res.status(200).json({});
});

module.exports = router;
