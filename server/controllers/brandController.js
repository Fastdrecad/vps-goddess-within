const asyncHandler = require('../middleware/asyncHandler');

// Bring in Models & Utils
const Brand = require('../models/brand');
const Product = require('../models/product');

/* Fetch brands */
/* route GET /api/brands/list */
/* access Public */
const getBrandsList = asyncHandler(async (req, res) => {
  let brands = null;

  brands = await Brand.find({});

  // Transform _id to id in the response
  const transformedBrands = brands.map(brand => ({
    _id: brand._id,
    name: brand.name,
    slug: brand.slug
  }));

  if (brands) {
    res.status(200).json({ brands: transformedBrands });
  } else {
    res.status(404);
    throw new Error('Brands not found');
  }
});

const getBrandBySlug = asyncHandler(async (req, res) => {
  const brandSlug = req.params.slug;

  // Find the brand by its slug
  const brand = await Brand.findOne({ slug: brandSlug });

  if (!brand) {
    res.status(404);
    throw new Error('Brand not found');
  }

  // Extract the brand ID
  const brandId = brand._id;

  // Destructure query parameters
  const {
    page = Number(req.query.pageNumber) || 1,
    limit = Number(req.query.limitNumber) || 12,
    sort,
    fields,
    size,
    price,
    rating,
    skirts,
    dresses,
    tShirts,
    trousers,
    blazers
  } = req.query;

  // Construct query object
  let query = Product.find({ brand: brandId });

  if (size) {
    query = query.where('sizes.size').equals(size);
  }

  if (price) {
    const [minPrice, maxPrice] = price.split('-');
    query = query.where('price').gte(minPrice).lte(maxPrice);
  }

  if (rating) {
    query = query.where('rating').gte(rating);
  }

  if (skirts) {
    query = query.where('category').equals(skirts);
  } else if (dresses) {
    query = query.where('category').equals(dresses);
  } else if (tShirts) {
    query = query.where('category').equals(tShirts);
  } else if (trousers) {
    query = query.where('category').equals(trousers);
  } else if (blazers) {
    query = query.where('category').equals(blazers);
  }

  // Populate brand fields
  query = query.populate('brand', 'name description');

  // Sorting
  if (sort === 'desc') {
    query = query.sort({ price: -1 }); // Sort products in descending order by price
  } else if (sort === 'asc') {
    query = query.sort({ price: 1 }); // Sort products in ascending order by price
  } else if (sort === 'createdAt') {
    query = query.sort({ createdAt: -1 }); // Sort products in descending order by createdAt (newest first)
  } else {
    query = query.sort({ createdAt: -1 }); // Default sorting by createdAt in descending order
  }

  // Limiting the fields
  query = query.select('-__v'); // Exclude __v field from results

  // Pagination
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(parseInt(limit));

  // Execute query
  const products = await query;

  // Count total documents
  const totalDocuments = await Product.countDocuments({ brand: brandId });

  if (products.length > 0) {
    res.status(200).json({
      totalPages: Math.ceil(totalDocuments / limit),
      currentPage: parseInt(page),
      totalProducts: totalDocuments,
      count: products.length, // Count of products returned after applying filters
      products
    });
  } else {
    res.status(404);
    throw new Error('No products found for the specified brand slug');
  }
});

module.exports = {
  getBrandsList,
  getBrandBySlug
};
