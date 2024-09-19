const asyncHandler = require('../middleware/asyncHandler');

// Bring in Models & Helpers
const Wishlist = require('../models/wishlist');

// @desc   Add to wishlist
// @route   POST /api/wishlist
// @access  Private

const addToWishList = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  // Find the login user
  const loginUserId = req?.user?._id;
  // Find if the user has liked the product
  const isLiked = Wishlist?.isLiked;
  if (isLiked) {
    const wishlist = await Wishlist.findByIdAndUpdate(
      productId,
      {
        $pull: { likes: loginUserId },
        isLiked: false
      },
      { new: true }
    );
    res.json(wishlist);
  } else {
    const wishlist = await Wishlist.findByIdAndUpdate(
      productId,
      {
        $push: { likes: loginUserId },
        isLiked: true
      },
      { new: true }
    );
    res.json(wishlist);
  }
});

// @desc   Fetch wishlist api
// @route   GET /api/wishlist
// @access  Private
const getWishlist = asyncHandler(async (req, res) => {
  const user = req.user._id;

  const wishlist = await Wishlist.find({ user, isLiked: true })
    .populate({
      path: 'product',
      select: 'name slug price images'
    })
    .sort('-updated');

  if (wishlist) {
    res.status(200).json({ wishlist });
  } else {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

module.exports = {
  addToWishList,
  getWishlist
};
