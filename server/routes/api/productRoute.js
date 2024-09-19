const {
  getProductById,
  createProduct,
  createProductReview,
  getFilteredProducts,
  getFilteredProductsByBrand,
  getProductsByType,
  getProducts,
  updateProduct,
  deleteProduct
} = require('../../controllers/productController');
const { protect, admin } = require('../../middleware/authMiddleware');
const { checkObjectId } = require('../../middleware/checkObjectId');

const router = require('express').Router();

// fetch all products api
router.get('/list', getProducts);

// fetch featured products api
router.get('/featured', getProductsByType);

// fetch filtered products api
router.get('/', getFilteredProducts);

// fetch filtered products by brand api
router.get('/brands', getFilteredProductsByBrand);

// fetch product api
router.get('/:id', checkObjectId, getProductById);

// update product api
router.put('/:id', protect, admin, checkObjectId, updateProduct);

// delete product api
router.delete('/:id', protect, admin, checkObjectId, deleteProduct);

// create product api
router.post('/', protect, admin, createProduct);

// create review api
router.post('/:id/reviews', protect, checkObjectId, createProductReview);

module.exports = router;
