const router = require('express').Router();
const pageRouter = require('./pages');
const apiRouter = require('./api');
const tokenParser = require('../middlewares/token-parser');

router.use(tokenParser);

router.use('/', pageRouter);
router.use('/api', apiRouter);

module.exports = router;
