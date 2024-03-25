const router = require('express').Router();

const pagesController = require('../../controllers/pages.controller');
const templateLocals = require('../../middlewares/template-locals');

router.use(templateLocals);

router.get('/', pagesController.renderIndex);

router.get('/login', pagesController.renderLogin);

router.get('/signup', pagesController.renderSignup);

router.get('/home', pagesController.renderHome);

router.get('/users', pagesController.renderUsers);

module.exports = router;
