const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
  getProductsByCategory
} = require('../controllers/productController');

// Routes for /api/products

// GET all products and POST new product
router.route('/')
  .get(getAllProducts)
  .post(createProduct)
  .delete(deleteAllProducts);

// GET products by category
router.route('/category/:category')
  .get(getProductsByCategory);

// GET, PUT, and DELETE product by ID
router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
