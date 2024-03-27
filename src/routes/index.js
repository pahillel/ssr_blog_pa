const router = require('express').Router();

const tokenParser = require('../middlewares/token-parser');
const pageRouter = require('./pages');
const apiRouter = require('./api');

/**
 * Middleware function to parse and validate tokens.
 * @function
 * @name tokenParser
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Next middleware function.
 */
router.use(tokenParser);

/**
 * Mounts the API router at the '/api' path.
 * @name use/api
 * @function
 * @param {string} path - The path at which the API router will be mounted.
 * @param {Router} apiRouter - The API router to be mounted.
 */
router.use('/api', apiRouter);

/**
 * Mounts the page router at the root path.
 * @name use/
 * @function
 * @param {string} path - The path at which the page router will be mounted.
 * @param {Router} pageRouter - The page router to be mounted.
 */
router.use('/', pageRouter);

module.exports = router;
