'use strict';

const express = require('express');
const router = express.Router();
const drErrorHandler = require('core/middleware/error-handler');

// TODO: mount sub-routers here, if needed.
router.use(require('./ping'));

router.use(drErrorHandler);

module.exports = router;
