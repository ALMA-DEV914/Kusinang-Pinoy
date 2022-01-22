const { Recipe } = require('../models')
  
const recipeController = {
  
      getAllRecipe(req, res){
          Recipe.find({})
          .populate({
            path: 'comments',
            select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1})
          .then(dbRecipeData => res.json(dbRecipeData))
          .catch(err => {
              console.log(err);
              res.status(400).json(err);
          });
      },

       // get one recipe by id
  getRecipeById({ params }, res) {
    Recipe.findOne({ _id: params.id })
    .populate({
      path: 'comments',
      select: '-__v'
    })
    .select('-__v')
      .then(dbRecipeData => {
        // If no recipe is found, send 404
        if (!dbRecipeData) {
          res.status(404).json({ message: 'No recipe found with this id!' });
          return;
        }
        res.json(dbRecipeData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

createRecipe({ body }, res) {
    Recipe.create(body)
      .then(dbRecipeData => res.json(dbRecipeData))
      .catch(err => res.status(400).json(err));
  },

  
updateRecipe({ params, body }, res) {
    Recipe.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
      .then(dbRecipeData => {
        if (!dbRecipeData) {
          res.status(404).json({ message: 'No recipefound with this id!' });
          return;
        }
        res.json(dbRecipeData);
      })
      .catch(err => res.status(400).json(err));
  },


deleteRecipe({ params }, res) {
    Recipe.findOneAndDelete({ _id: params.id })
      .then(dbRecipeData => {
        if (!dbRecipeData) {
          res.status(404).json({ message: 'No recipe found with this id!' });
          return;
        }
        res.json(dbRecipeData);
      })
      .catch(err => res.status(400).json(err));
  }
}

module.exports = recipeController;