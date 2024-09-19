const asyncHandler = require("../middleware/asyncHandler");
const fs = require("fs");
const mongoose = require("mongoose");

// Bring in Models & Utils
const Product = require("../models/product");
const Brand = require("../models/brand");
const Category = require("../models/category");

/* Fetch all products */
/* route GET /api/products/list */
/* access Public */
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.status(200).json({
    products
  });
});

/* Fetch single product */
/* route GET /api/products/:id */
/* access Public */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("brand", "name") // Populate brand field with only name
    .populate("category", "name"); // Populate category field with only name

  // Define default values for brand and category
  let brand = { _id: null, name: "" };
  let category = { _id: null, name: "" };

  // Check if brand exists
  if (product.brand) {
    brand = { _id: product.brand._id, name: product.brand.name };
  }

  // Check if category exists
  if (product.category) {
    category = { _id: product.category._id, name: product.category.name };
  }

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/* Fetch featured products */
/* route GET /api/products/featured */
/* access Public */
const getProductsByType = asyncHandler(async (req, res) => {
  const { type } = req.query;

  if (type) {
    const products = await Product.find({ type });
    res.status(200).json({ products });
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
});

/* Fetch filtered products */
/* route GET /api/products */
/* access Public */

const getFilteredProducts = asyncHandler(async (req, res) => {
  // Destructure query parameters
  const {
    page = Number(req.query.pageNumber) || 1,
    limit = Number(req.query.limitNumber) || 12,
    sort,
    fields,
    size,
    price,
    rating,
    category,
    ...otherFilters
  } = req.query;

  // Construct query object
  let query = Product.find();

  // Category filter
  if (category) {
    const categoryIds = category
      .split(",")
      .map((id) => new mongoose.Types.ObjectId(id)); // Corrected line
    query = query.where("category").in(categoryIds);
  }

  // Apply filters
  if (size) {
    query = query.where("sizes.size").equals(size);
  }

  if (price) {
    const [minPrice, maxPrice] = price.split("-");
    query = query.where("price").gte(minPrice).lte(maxPrice);
  }

  if (rating) {
    query = query.where("rating").gte(rating);
  }

  // Apply other filters
  query = query.where(otherFilters);

  // Sorting
  if (sort === "desc") {
    query = query.sort({ price: -1 }); // Sort products in descending order by price
  } else if (sort === "asc") {
    query = query.sort({ price: 1 }); // Sort products in ascending order by price
  } else if (sort === "createdAt") {
    query = query.sort({ createdAt: -1 }); // Sort products in descending order by createdAt (newest first)
  } else {
    // Handle other sorting options here
    // For example, you can set a default sorting behavior
    query = query.sort({ createdAt: -1 }); // Default sorting by createdAt in descending order
  }

  // Limiting the fields
  if (fields) {
    const selectedFields = fields.split(",").join(" ");
    query = query.select(selectedFields);
  } else {
    query = query.select("-__v");
  }

  // Pagination
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(parseInt(limit));

  // Execute query
  const products = await query;

  // Count total documents
  const totalDocuments = await Product.countDocuments(query._conditions);

  // Calculate total totalPages
  const totalPages = Math.ceil(totalDocuments / limit);

  if (products.length > 0) {
    res.status(200).json({
      totalPages,
      currentPage: parseInt(page),
      totalProducts: totalDocuments,
      count: products.length,
      products
    });
  } else {
    res.status(404);
    throw new Error("No products found");
  }
});

/* Fetch filtered products */
/* route GET /api/products */
/* access Public */

const getFilteredProductsByBrand = asyncHandler(async (req, res) => {
  // Destructure query parameters
  const {
    page = Number(req.query.pageNumber) || 1,
    limit = Number(req.query.limitNumber) || 12,
    sort,
    fields,
    size,
    price,
    rating,
    category,
    brandSlug,
    ...otherFilters
  } = req.query;

  // Construct query object
  let query = Product.find();

  if (brandSlug) {
    // Apply brand filter based on slug name
    query = query.where("brandSlug").equals(brandSlug);
  }

  // Category filter
  if (category) {
    const categoryIds = category
      .split(",")
      .map((id) => new mongoose.Types.ObjectId(id)); // Corrected line
    query = query.where("category").in(categoryIds);
  }

  // Apply filters
  if (size) {
    query = query.where("sizes.size").equals(size);
  }

  if (price) {
    const [minPrice, maxPrice] = price.split("-");
    query = query.where("price").gte(minPrice).lte(maxPrice);
  }

  if (rating) {
    query = query.where("rating").gte(rating);
  }

  // Apply other filters
  query = query.where(otherFilters);

  // Sorting
  if (sort === "desc") {
    query = query.sort({ price: -1 }); // Sort products in descending order by price
  } else if (sort === "asc") {
    query = query.sort({ price: 1 }); // Sort products in ascending order by price
  } else if (sort === "createdAt") {
    query = query.sort({ createdAt: -1 }); // Sort products in descending order by createdAt (newest first)
  } else {
    // Handle other sorting options here
    // For example, you can set a default sorting behavior
    query = query.sort({ createdAt: -1 }); // Default sorting by createdAt in descending order
  }

  // Limiting the fields
  if (fields) {
    const selectedFields = fields.split(",").join(" ");
    query = query.select(selectedFields);
  } else {
    query = query.select("-__v");
  }

  // Pagination
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(parseInt(limit));

  // Execute query
  const products = await query;

  // Count total documents
  const totalDocuments = await Product.countDocuments(query._conditions);

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
    throw new Error("No products found");
  }
});

/* Create single product */
/* route POST /api/products/ */
/* access Private/Admin */
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    title,
    description,
    images,
    brand: brandName, // Change variable name to avoid conflicts
    category: categoryName, // Change variable name to avoid conflicts
    price,
    sizes,
    countInStock,
    isNewProduct,
    isDeal,
    discount,
    type
  } = req.body;

  let brand;
  let category;

  // Check if brand exists, if not create a new one
  if (brandName?.name) {
    brand = await Brand.findOne({ name: brandName.name });
    if (!brand) {
      brand = await Brand.create({ name: brandName.name });
    }
  }

  // Check if category exists, if not create a new one
  if (categoryName?.name) {
    category = await Category.findOne({ name: categoryName?.name });
    if (!category) {
      category = await Category.create({ name: categoryName?.name });
    }
  }

  // Ensure that both brand and category exist
  if (!brand || !category) {
    return res
      .status(400)
      .json({ message: "Brand and category are required." });
  }

  const product = new Product({
    user: req.user._id,
    name,
    title,
    description,
    images,
    brand: brand._id,
    category: category._id,
    price,
    sizes,
    countInStock,
    isNewProduct,
    isDeal,
    discount,
    type
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const formData = req.body;
  page = Number(req.query.pageNumber) || 1;
  limit = Number(req.query.limitNumber) || 10;

  const product = await Product.findById(productId);

  if (product) {
    // Check if price is zero
    if (formData.price === 0) {
      res.status(400);
      throw new Error("Product price must be greater than 0");
    }

    // Check if countInStock is zero
    if (formData.countInStock === 0) {
      res.status(400);
      throw new Error("Product countInStock must be greater than 0");
    }

    // Check if discount is zero
    if (formData.discount === 0) {
      formData.discount = null;
    }
    let updatedCategory = formData.category; // Declare updatedCategory here

    // Check if category exists, if not, create a new category
    if (!updatedCategory._id) {
      // Category does not have an _id, it's a new category
      const existingCategory = await Category.findOne({
        name: updatedCategory.name
      });
      if (!existingCategory) {
        // Category does not exist, create a new category
        const createdCategory = await Category.create({
          name: updatedCategory.name
        });
        updatedCategory = createdCategory._id; // Assign the _id of the newly created category
      } else {
        // Category already exists, update category with existing _id
        updatedCategory = existingCategory._id; // Assign the _id of the existing category
      }
    } else {
      // If _id is provided, ensure it's converted to ObjectId type
      updatedCategory = new mongoose.Types.ObjectId(updatedCategory._id);
    }

    let updatedBrand = formData.brand; // Declare updatedBrand here

    // Check if brand exists, if not, create a new brand
    if (!updatedBrand._id) {
      // Brand does not have an _id, it's a new brand
      const existingBrand = await Brand.findOne({ name: updatedBrand.name });
      if (!existingBrand) {
        // Brand does not exist, create a new brand
        const createdBrand = await Brand.create({ name: updatedBrand.name });
        updatedBrand = createdBrand._id; // Assign the _id of the newly created brand
      } else {
        // Brand already exists, update brand with existing _id
        updatedBrand = existingBrand._id; // Assign the _id of the existing brand
      }
    } else {
      // If _id is provided, ensure it's converted to ObjectId type
      updatedBrand = new mongoose.Types.ObjectId(updatedBrand._id);
    }

    product.name = formData.name;
    product.title = formData.title;
    product.description = formData.description;
    product.images = formData.images;
    product.brand = updatedBrand;
    product.category = updatedCategory;
    product.price = formData.price;
    product.sizes = formData.sizes;
    product.countInStock = formData.countInStock;
    product.isDeal = formData.isDeal;
    product.isNewProduct = formData.isNewProduct;
    product.discount = formData.discount;
    product.type = formData.type;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findById(productId);

  if (product) {
    await Product.deleteOne({ _id: product._id });

    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc   Create a new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      rating: Number(rating),
      comment,
      user: req.user._id
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

module.exports = {
  getProducts,
  getProductsByType,
  getFilteredProducts,
  getFilteredProductsByBrand,
  getProductById,
  createProduct,
  updateProduct,
  createProductReview,
  deleteProduct
};
