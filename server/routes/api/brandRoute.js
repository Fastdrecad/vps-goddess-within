const {
  getBrandsList,
  getBrandBySlug
} = require('../../controllers/brandController');

const router = require('express').Router();

// fetch shop brands api
router.get('/list', getBrandsList);
router.get('/:slug', getBrandBySlug);

module.exports = router;
