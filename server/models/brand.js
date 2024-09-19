const mongoose = require('mongoose');
const slugify = require('slugify');
const { Schema } = mongoose;

// Brand Schema
const BrandSchema = new Schema(
  {
    name: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    slug: { type: String, unique: true, index: true }
  },
  { timestamps: true }
);

BrandSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Brand', BrandSchema);
