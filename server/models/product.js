const mongoose = require('mongoose');
const slugify = require('slugify');

const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
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

// Product Schema
const ProductSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      material: {
        type: String,
        enum: ['Cotton', 'Polyester', 'Wool', 'Linen', 'Silk'] // Example materials
      },
      fabric: {
        type: String,
        enum: ['Knit', 'Woven', 'Nonwoven', 'Lace'] // Example fabric types
      },
      careInstructions: {
        type: String,
        enum: [
          'Machine Wash Cold',
          'Hand Wash',
          'Dry Clean Only',
          'Do Not Bleach'
        ]
      }
    },
    images: [], // Specify images as an array of strings
    slug: { type: String, unique: true, index: true }, // Define slug field for unique slugs
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      default: null
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null
    },
    reviews: [ReviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    sizes: [
      {
        size: {
          type: String,
          enum: ['XS', 'S', 'M', 'L', 'XL'],
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          default: 0
        }
      }
    ],
    countInStock: {
      type: Number,
      required: true,
      default: 0
    },
    isNewProduct: {
      type: Boolean,
      default: false
    },
    isDeal: {
      type: Boolean,
      default: false
    },
    discount: {
      type: Number
    },
    type: [String]
  },
  {
    timestamps: true
  }
);

// Middleware to generate a slug before saving
ProductSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true }); // Generate slug from product name
  next();
});

module.exports = mongoose.model('Product', ProductSchema);
