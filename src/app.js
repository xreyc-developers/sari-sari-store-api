const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');

// ERROR HANDLINGS
require('express-async-errors');

// CONFIGURATIONS
require('./config/passport/passport-local')(passport);
require('./config/passport/passport-jwt')(passport);
require('./config/timezone/timezone');

// ROUTE IMPORTS
// MAIN
const mainRoutes = require('./routes/main.routes');
// AUTHENTICATION ROUTES
const authRoutes = require('./routes/auth.routes');
// STORE ROUTES
const storeRoutes = require('./routes/store.routes');
const storePaymentTypeRoutes = require('./routes/store_payment_type.routes');
const storeDiscountRoutes = require('./routes/store_discount.routes');
const storeCouponRoutes = require('./routes/store_coupon.routes');
// PRODUCT ROUTES
const productRoutes = require('./routes/product.routes');
const productCategoryRoutes = require('./routes/product_category.routes');
const unitOfMeasureRoutes = require('./routes/unit_of_measure.routes');
// ORDER ROUTES
const orderRoutes = require('./routes/order.routes');

// INITIALIZE
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// ROUTES
app.use('', mainRoutes);
app.use('/api', mainRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/store_payment_type', storePaymentTypeRoutes);
app.use('/api/store_discount', storeDiscountRoutes);
app.use('/api/store_coupon', storeCouponRoutes);
app.use('/api/product', productRoutes);
app.use('/api/product_category', productCategoryRoutes);
app.use('/api/unit_of_measure', unitOfMeasureRoutes);
app.use('/api/order_with_products', orderRoutes);

module.exports = app;