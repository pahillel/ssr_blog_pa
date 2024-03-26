const router = require('express').Router();
const pageRouter = require('./pages');
const apiRouter = require('./api');
const tokenParser = require('../middlewares/token-parser');

router.use(tokenParser);

router.use('/api', apiRouter);
router.use('/', pageRouter);

module.exports = router;
