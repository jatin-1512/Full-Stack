const mongoose = require('mongoose');

// Define the Variant subdocument schema
const variantSchema = new mongoose.Schema({
  color: {
    type: String,
    required: [true, 'Color is required'],
    trim: true
  },
  size: {
    type: String,
    required: [true, 'Size is required'],
    trim: true
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  }
}, { _id: true }); // Keep _id for each variant

// Define the Product schema with nested variants
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    minlength: [2, 'Product name must be at least 2 characters'],
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    enum: {
      values: ['Electronics', 'Apparel', 'Footwear', 'Accessories', 'Home & Garden', 'Sports', 'Books', 'Toys'],
      message: '{VALUE} is not a valid category'
    }
  },
  variants: {
    type: [variantSchema],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'Product must have at least one variant'
    }
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Index for faster category queries
productSchema.index({ category: 1 });

// Index for faster price range queries
productSchema.index({ price: 1 });

// Virtual property to calculate total stock across all variants
productSchema.virtual('totalStock').get(function() {
  return this.variants.reduce((total, variant) => total + variant.stock, 0);
});

// Method to get available colors
productSchema.methods.getAvailableColors = function() {
  return [...new Set(this.variants.map(v => v.color))];
};

// Method to get available sizes
productSchema.methods.getAvailableSizes = function() {
  return [...new Set(this.variants.map(v => v.size))];
};

// Static method to get products by category
productSchema.statics.findByCategory = function(category) {
  return this.find({ category });
};

// Static method to get products by color
productSchema.statics.findByColor = function(color) {
  return this.find({ 'variants.color': color });
};

// Ensure virtuals are included in JSON output
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
