const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getProductsByColor,
  getProductVariants,
  updateProduct,
  deleteProduct,
  addVariant,
  updateVariantStock
} = require('../controllers/productController');

// Route: /api/products
router.route('/')
  .get(getAllProducts)       // GET all products
  .post(createProduct);      // CREATE a new product

// Route: /api/products/category/:category
router.get('/category/:category', getProductsByCategory);

// Route: /api/products/by-color/:color
router.get('/by-color/:color', getProductsByColor);

// Route: /api/products/:id
router.route('/:id')
  .get(getProductById)       // GET product by ID
  .put(updateProduct)        // UPDATE product by ID
  .delete(deleteProduct);    // DELETE product by ID

// Route: /api/products/:id/variants
router.route('/:id/variants')
  .get(getProductVariants)   // GET product variants (projection)
  .post(addVariant);         // ADD a new variant to product

// Route: /api/products/:productId/variants/:variantId
router.patch('/:productId/variants/:variantId', updateVariantStock);

module.exports = router;
