const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Load environment variables
dotenv.config();

// Sample products with nested variants
const sampleProducts = [
  {
    name: 'Running Shoes',
    price: 120,
    category: 'Footwear',
    variants: [
      { color: 'Red', size: 'M', stock: 10 },
      { color: 'Blue', size: 'L', stock: 5 },
      { color: 'Black', size: 'S', stock: 8 }
    ]
  },
  {
    name: 'Smartphone',
    price: 699,
    category: 'Electronics',
    variants: [
      { color: 'Black', size: '128GB', stock: 15 },
      { color: 'White', size: '256GB', stock: 10 },
      { color: 'Blue', size: '128GB', stock: 12 }
    ]
  },
  {
    name: 'Winter Jacket',
    price: 200,
    category: 'Apparel',
    variants: [
      { color: 'Black', size: 'M', stock: 8 },
      { color: 'Gray', size: 'L', stock: 12 },
      { color: 'Navy', size: 'XL', stock: 6 }
    ]
  },
  {
    name: 'Laptop Backpack',
    price: 45,
    category: 'Accessories',
    variants: [
      { color: 'Black', size: 'Standard', stock: 20 },
      { color: 'Gray', size: 'Standard', stock: 15 }
    ]
  },
  {
    name: 'Wireless Headphones',
    price: 150,
    category: 'Electronics',
    variants: [
      { color: 'Black', size: 'One Size', stock: 25 },
      { color: 'White', size: 'One Size', stock: 18 },
      { color: 'Red', size: 'One Size', stock: 10 }
    ]
  },
  {
    name: 'Yoga Mat',
    price: 35,
    category: 'Sports',
    variants: [
      { color: 'Purple', size: 'Standard', stock: 30 },
      { color: 'Blue', size: 'Standard', stock: 25 },
      { color: 'Pink', size: 'Standard', stock: 20 }
    ]
  },
  {
    name: 'T-Shirt',
    price: 25,
    category: 'Apparel',
    variants: [
      { color: 'White', size: 'S', stock: 50 },
      { color: 'White', size: 'M', stock: 40 },
      { color: 'White', size: 'L', stock: 30 },
      { color: 'Black', size: 'S', stock: 45 },
      { color: 'Black', size: 'M', stock: 35 },
      { color: 'Black', size: 'L', stock: 25 }
    ]
  },
  {
    name: 'Smart Watch',
    price: 299,
    category: 'Electronics',
    variants: [
      { color: 'Silver', size: '42mm', stock: 12 },
      { color: 'Black', size: '42mm', stock: 15 },
      { color: 'Gold', size: '46mm', stock: 8 }
    ]
  }
];

// Connect to MongoDB and seed data
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce_catalog', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connected...');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products removed.');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`${products.length} products inserted successfully!`);

    console.log('\n=== Sample Products ===');
    products.forEach(product => {
      console.log(`\nProduct: ${product.name}`);
      console.log(`Category: ${product.category}`);
      console.log(`Price: $${product.price}`);
      console.log(`Variants: ${product.variants.length}`);
      console.log(`Total Stock: ${product.totalStock}`);
    });

    // Demonstrate nested document queries
    console.log('\n=== Query Examples ===');

    // 1. Get all products in Electronics category
    const electronics = await Product.find({ category: 'Electronics' });
    console.log(`\n1. Electronics products: ${electronics.length}`);

    // 2. Get products with Blue variants
    const blueProducts = await Product.find({ 'variants.color': 'Blue' });
    console.log(`2. Products with Blue variants: ${blueProducts.length}`);

    // 3. Project only variants from a specific product
    const productWithVariants = await Product.findOne({ name: 'Running Shoes' })
      .select('name variants');
    console.log(`3. Running Shoes has ${productWithVariants.variants.length} variants`);

    // 4. Get products with stock > 10 in any variant
    const highStockProducts = await Product.find({ 'variants.stock': { $gt: 10 } });
    console.log(`4. Products with variants having stock > 10: ${highStockProducts.length}`);

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
