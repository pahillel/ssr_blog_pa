const express = require('express');
const router = express.Router();

const pageRouter = require('./pages');
const apiRouter = require('./api');

router.use('/', pageRouter);
router.use('/api', apiRouter);

module.exports = router;
