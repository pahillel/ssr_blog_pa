const router = require('express').Router();

// create comment auth
router.post('/');

// delete comment auth check author === userId
router.delete('/:postId');

module.exports = router;
