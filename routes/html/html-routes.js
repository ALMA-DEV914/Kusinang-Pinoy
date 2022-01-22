const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/recipe-list.html'));
});

router.get('/add-recipe', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/add-recipe.html'));
});

router.get('/recipe', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/recipe.html'));
});

module.exports = router;
