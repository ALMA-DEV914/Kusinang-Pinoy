const router = require('express').Router();

const commentRoutes = require('./comment-routes');
const recipeRoutes = require('./recipe-routes');

router.use('/comments', commentRoutes);
// add prefix of `/recipes` to routes created in `recipe-routes.js`
router.use('/recipes', recipeRoutes);

module.exports = router;
