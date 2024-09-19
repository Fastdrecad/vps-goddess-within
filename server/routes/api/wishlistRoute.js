const {
  addToWishList,
  getWishlist
} = require('../../controllers/wishlistController');
const { protect } = require('../../middleware/authMiddleware');

const router = require('express').Router();

/* Add to wishlist */
/* route POST /api/wishlist */
/* access Public */

// add product to wishlist
router.put('/', protect, addToWishList);

router.get('/', protect, getWishlist);

module.exports = router;
