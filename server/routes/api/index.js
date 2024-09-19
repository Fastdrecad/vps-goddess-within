const keys = require('../../config/keys');
const router = require('express').Router();

const { paypal } = keys;
const authRoutes = require('./authRoute');
const productRoutes = require('./productRoute');
const categoryRoutes = require('./categoryRoute');
const brandRoutes = require('./brandRoute');
const userRoutes = require('./userRoute');
const orderRoutes = require('./orderRoute');
const wishlistRoutes = require('./wishlistRoute');
const uploadRoutes = require('./uploadRoute');

// auth routes
router.use('/auth', authRoutes);

// user routes
router.use('/users', userRoutes);

// products routes
router.use('/products', productRoutes);

// brands routes
router.use('/brands', brandRoutes);

// categories routes
router.use('/categories', categoryRoutes);

// order routes
router.use('/orders', orderRoutes);

// wishlist routes
router.use('/wishlists', wishlistRoutes);

// paypal config route
router.use('/config/paypal', (req, res) => res.send({ clientId: paypal.key }));

// upload images
router.use('/upload', uploadRoutes);

module.exports = router;
