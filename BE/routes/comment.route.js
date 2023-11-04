const router = require('express').Router();
const commentController = require('../controllers/comment.controller');
const {authenticate} = require('../middleware/auth.middleware');

router.post('/:postId', authenticate, commentController.createComment);
router.put('/:id', authenticate, commentController.updateComment);
router.delete('/:id', authenticate, commentController.deleteComment);
router.get('/:postId', commentController.getCommentByPostId);

module.exports = router;
