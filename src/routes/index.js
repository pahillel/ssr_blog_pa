const express = require('express');
const router = express.Router();

const pageRouter = require('./pages');

router.use('/', pageRouter);

module.exports = router;
