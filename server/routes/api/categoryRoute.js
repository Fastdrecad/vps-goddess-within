const {
  getCategoriesList,
  getCategoryBySlug,
  getCategories
} = require('../../controllers/categoryController');

const router = require('express').Router();

// fetch shop brands api
router.get('/', getCategories);
router.get('/list', getCategoriesList);
router.get('/:slug', getCategoryBySlug);

module.exports = router;
