const router = require('express').Router();
const {
    getAllRecipe,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
  } = require('../../controllers/recipe-controller');

router
  .route('/')
  .get(getAllRecipe)
  .post(createRecipe);

router
  .route('/:id')
  .get(getRecipeById)
  .put(updateRecipe)
  .delete(deleteRecipe);

module.exports = router;