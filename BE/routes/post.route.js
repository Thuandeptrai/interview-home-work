const router = require('express').Router();
const postController = require('../controllers/post.controller');
const {authenticate} = require('../middleware/auth.middleware');

router.post('/', authenticate, postController.createPost);
router.get('/keyword', postController.findPostByKeyWord);
router.get('/', postController.getPostPaging);
router.delete('/:id', authenticate, postController.deletePost);

module.exports = router;