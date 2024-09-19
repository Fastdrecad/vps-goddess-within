const mongoose = require('mongoose');
const { Schema } = mongoose;

// Wishlist Schema
const WishlistSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      default: null
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    isLiked: {
      type: Boolean,
      default: false
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Wishlist', WishlistSchema);
