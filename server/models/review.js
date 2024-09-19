const mongoose = require('mongoose');

const { Schema } = mongoose;

// Review Schema
const ReviewSchema = new Schema(
  {
    // product: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Product',
    //   default: null
    // },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      default: null
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    rating: {
      type: Number,
      required: true,
      default: 0
    },
    comment: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
