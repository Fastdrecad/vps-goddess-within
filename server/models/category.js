const mongoose = require('mongoose');
const slugify = require('slugify');

const { Schema } = mongoose;

// Category Schema
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    slug: { type: String, unique: true, index: true }, // Define slug field for unique slugs
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    ]
  },
  { timestamps: true }
);

// Middleware to generate slug before saving
CategorySchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true }); // Generate slug from category name
  next();
});

module.exports = mongoose.model('Category', CategorySchema);
