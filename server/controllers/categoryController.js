const asyncHandler = require('../middleware/asyncHandler');

// Bring in Models & Utils
const Category = require('../models/category');
const Product = require('../models/product');

/* Fetch categories */
/* route GET /api/categories */
/* access Public */
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  categories.map(category => ({
    _id: category._id,
    name: category.name
  }));

  res.status(200).json({ categories });
});

/* Fetch categories */
/* route GET /api/categories/list */
/* access Public */
const getCategoriesList = asyncHandler(async (req, res) => {
  let categories = null;

  categories = await Category.find({});

  if (categories) {
    res.status(200).json({ categories });
  } else {
    res.status(404);
    throw new Error('Categories not found');
  }
});

/* Fetch single category by slug */
/* route GET /api/categories/:slug */
/* access Public */
const getCategoryBySlug = asyncHandler(async (req, res) => {
  const categorySlug = req.params.slug;

  // Find the category by its slug
  const category = await Category.findOne({ slug: categorySlug });

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  // Extract the category ID
  const categoryId = category._id;

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
    blazers,
    ...otherFilters
  } = req.query;

  // Construct query object
  let query = Product.find({ category: categoryId });

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

  // Apply other filters
  query = query.where(otherFilters);

  // Populate category fields
  query = query.populate('category', 'name description');

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
  const totalDocuments = await Product.countDocuments({ category: categoryId });

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
    throw new Error('No products found for the specified category slug');
  }
});

module.exports = { getCategories, getCategoriesList, getCategoryBySlug };
