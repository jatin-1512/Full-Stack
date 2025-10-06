const mongoose = require('mongoose');

// Define the Product Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: [3, 'Product name must be at least 3 characters long'],
      maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
      validate: {
        validator: function(value) {
          return value >= 0;
        },
        message: 'Price must be a positive number'
      }
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      trim: true,
      enum: {
        values: ['Electronics', 'Clothing', 'Food', 'Books', 'Toys', 'Accessories', 'Stationery', 'Other'],
        message: '{VALUE} is not a valid category'
      }
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt fields
    // versionKey defaults to '__v' which keeps version control enabled
  }
);

// Create indexes for better query performance
productSchema.index({ name: 1 });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });

// Instance method to get product summary
productSchema.methods.getSummary = function() {
  return `${this.name} - $${this.price} (${this.category})`;
};

// Static method to find products by category
productSchema.statics.findByCategory = function(category) {
  return this.find({ category });
};

// Static method to find products within a price range
productSchema.statics.findByPriceRange = function(minPrice, maxPrice) {
  return this.find({ price: { $gte: minPrice, $lte: maxPrice } });
};

// Create and export the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
