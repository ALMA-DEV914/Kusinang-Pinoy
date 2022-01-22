const router = require('express').Router();
const { addComment, removeComment, addReply, removeReply } = require('../../controllers/comment-controller');



// /api/comments/<recipeId>
router.route('/:recipeId').post(addComment);

// /api/comments/<recipeId>/<commentId>
router.route('/:recipeId/:commentId')
.put(addReply)
.delete(removeComment);

// /api/comments/<recipeId>/<commentId>/<replyId>
router.route('/:recipeId/:commentId/:replyId').delete(removeReply);

module.exports = router;