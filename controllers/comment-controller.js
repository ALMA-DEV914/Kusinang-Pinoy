const { Comment, Recipe } = require('../models');

const commentController = {
    // add comment to recipe
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
          .then(({ _id }) => {
            return Recipe.findOneAndUpdate(
              { _id: params.recipeId },
              { $push: { comments: _id } },
              { new: true }
            );
          })
          .then(dbRecipeData => {
            if (!dbRecipeData) {
              res.status(404).json({ message: 'No recipe found with this id!' });
              return;
            }
            res.json(dbRecipeData);
          })
          .catch(err => res.json(err));
      },

      addReply({ params, body }, res) {
        Comment.findOneAndUpdate(
          { _id: params.commentId },
          { $push: { replies: body } },
          { new: true }
        )
          .then(dbRecipeData => {
            if (!dbRecipeData) {
              res.status(404).json({ message: 'No recipe found with this id!' });
              return;
            }
            res.json(dbRecipeData);
          })
          .catch(err => res.json(err));
      },
    

      removeComment({ params }, res) {
        Comment.findOneAndDelete({ _id: params.commentId })
          .then(deletedComment => {
            if (!deletedComment) {
              return res.status(404).json({ message: 'No comment with this id!' });
            }
            return Recipe.findOneAndUpdate(
              { _id: params.recipeId },
              { $pull: { comments: params.commentId } },
              { new: true }
            );
          })
          .then(dbRecipeData => {
            if (!dbRecipeData) {
              res.status(404).json({ message: 'No recipe found with this id!' });
              return;
            }
            res.json(dbRecipeData);
          })
          .catch(err => res.json(err));
      },

      // remove reply
   removeReply({ params }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $pull: { replies: { replyId: params.replyId } } },
      { new: true, runValidators: true }
    )
      .then(dbRecipeData => res.json(dbRecipeData))
      .catch(err => res.json(err));
  }
    };      
  

module.exports = commentController;