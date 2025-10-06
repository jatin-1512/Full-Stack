# E-commerce Catalog with Nested Documents

A comprehensive E-commerce Catalog API demonstrating MongoDB's nested document structure using Node.js, Express.js, and Mongoose. This project showcases how to effectively design and query complex nested data structures.

## 📋 Features

- ✅ **Nested Document Structure** - Products with embedded variant arrays
- ✅ **Complete CRUD Operations** - Create, Read, Update, Delete products
- ✅ **Advanced Queries** - Filter by category, color, and nested fields
- ✅ **Variant Management** - Add variants and update stock levels
- ✅ **Data Projection** - Retrieve specific fields and nested documents
- ✅ **Schema Validation** - Built-in validation for all fields
- ✅ **Seed Script** - Pre-populated sample data
- ✅ **MVC Architecture** - Clean separation of concerns

## 🏗️ Project Structure

```
EXP 3/
├── config/
│   └── database.js              # MongoDB connection
├── controllers/
│   └── productController.js     # Business logic & CRUD operations
├── models/
│   └── Product.js               # Mongoose schema with nested variants
├── routes/
│   └── productRoutes.js         # API route definitions
├── server.js                    # Application entry point
├── seed.js                      # Database seeding script
├── package.json                 # Dependencies
├── .env                         # Environment variables
├── test-api.html               # Interactive API tester
└── README.md                   # Documentation
```

## 📊 Data Model

### Product Schema
```javascript
{
  name: String,          // Product name
  price: Number,         // Product price
  category: String,      // Product category (enum)
  variants: [            // Array of nested variant documents
    {
      color: String,     // Variant color
      size: String,      // Variant size
      stock: Number      // Variant stock quantity
    }
  ],
  createdAt: Date,       // Auto-generated
  updatedAt: Date        // Auto-generated
}
```

### Example Document
```json
{
  "_id": "686f68ed2bf5384209b236af",
  "name": "Running Shoes",
  "price": 120,
  "category": "Footwear",
  "variants": [
    {
      "color": "Red",
      "size": "M",
      "stock": 10,
      "_id": "686f68ed2bf5384209b236b0"
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 5,
      "_id": "686f68ed2bf5384209b236b1"
    }
  ],
  "createdAt": "2025-10-05T10:30:00.000Z",
  "updatedAt": "2025-10-05T10:30:00.000Z"
}
```

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database with nested documents
- **Mongoose** - MongoDB object modeling with schema validation
- **dotenv** - Environment variables
- **cors** - Cross-Origin Resource Sharing

## 📦 Installation

1. **Navigate to the project directory:**
   ```bash
   cd "EXP 3"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file (already created):**
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/ecommerce_catalog
   ```

4. **Make sure MongoDB is running**

5. **Seed the database with sample data:**
   ```bash
   npm run seed
   ```

## 🚀 Running the Application

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Base URL: `http://localhost:3000/api/products`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get a specific product by ID |
| POST | `/api/products` | Create a new product |
| PUT | `/api/products/:id` | Update a product by ID |
| DELETE | `/api/products/:id` | Delete a product by ID |
| GET | `/api/products/category/:category` | Get products by category |
| GET | `/api/products/by-color/:color` | Get products by variant color |
| GET | `/api/products/:id/variants` | Get only variants of a product (projection) |
| POST | `/api/products/:id/variants` | Add a new variant to a product |
| PATCH | `/api/products/:productId/variants/:variantId` | Update variant stock |

## 📝 API Usage Examples

### 1. Create a Product with Variants (POST)
```bash
POST http://localhost:3000/api/products
Content-Type: application/json

{
  "name": "Running Shoes",
  "price": 120,
  "category": "Footwear",
  "variants": [
    {
      "color": "Red",
      "size": "M",
      "stock": 10
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 5
    }
  ]
}
```

### 2. Get All Products (GET)
```bash
GET http://localhost:3000/api/products
```

**Response:**
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "_id": "686f68ed2bf5384209b236af",
      "name": "Running Shoes",
      "price": 120,
      "category": "Footwear",
      "variants": [...],
      "totalStock": 23
    }
  ]
}
```

### 3. Get Products by Category (GET)
```bash
GET http://localhost:3000/api/products/category/Electronics
```

### 4. Get Products by Color (Nested Query) (GET)
```bash
GET http://localhost:3000/api/products/by-color/Blue
```

### 5. Get Product Variants Only (Projection) (GET)
```bash
GET http://localhost:3000/api/products/686f68ed2bf5384209b236af/variants
```

**Response:**
```json
{
  "success": true,
  "productName": "Running Shoes",
  "variantCount": 3,
  "variants": [
    {
      "color": "Red",
      "size": "M",
      "stock": 10
    }
  ]
}
```

### 6. Add a New Variant (POST)
```bash
POST http://localhost:3000/api/products/686f68ed2bf5384209b236af/variants
Content-Type: application/json

{
  "color": "Black",
  "size": "S",
  "stock": 8
}
```

### 7. Update Variant Stock (PATCH)
```bash
PATCH http://localhost:3000/api/products/686f68ed2bf5384209b236af/variants/686f68ed2bf5384209b236b0
Content-Type: application/json

{
  "stock": 15
}
```

## 🎯 Nested Document Concepts Demonstrated

### 1. **Embedded Arrays**
Products contain an array of variant subdocuments, demonstrating one-to-many relationships within a single document.

### 2. **Nested Field Queries**
Query products based on nested variant properties:
```javascript
// Find products with blue variants
Product.find({ 'variants.color': 'Blue' })

// Find products with stock > 10 in any variant
Product.find({ 'variants.stock': { $gt: 10 } })
```

### 3. **Projection**
Retrieve only specific fields:
```javascript
Product.findById(id).select('name variants')
```

### 4. **Subdocument Manipulation**
- Add new variants to existing products
- Update specific variant properties
- Each variant gets its own `_id`

### 5. **Virtual Properties**
Calculate derived values (e.g., total stock across all variants)

### 6. **Schema Validation**
- Required fields
- Enum validation for categories
- Min/max constraints
- Custom validators

## 📚 Available Categories

- Electronics
- Apparel
- Footwear
- Accessories
- Home & Garden
- Sports
- Books
- Toys

## 🔍 MongoDB Shell Query Examples

```javascript
// 1. Find all products in Electronics category
db.products.find({ category: "Electronics" })

// 2. Find products with Blue variants
db.products.find({ "variants.color": "Blue" })

// 3. Project only name and variants
db.products.find({}, { name: 1, variants: 1 })

// 4. Find products with specific variant color and size
db.products.find({
  "variants": {
    $elemMatch: { color: "Black", size: "M" }
  }
})

// 5. Count total variants across all products
db.products.aggregate([
  { $project: { variantCount: { $size: "$variants" } } },
  { $group: { _id: null, total: { $sum: "$variantCount" } } }
])
```

## 🎨 Sample Data

The seed script includes 8 sample products:
- Running Shoes (Footwear)
- Smartphone (Electronics)
- Winter Jacket (Apparel)
- Laptop Backpack (Accessories)
- Wireless Headphones (Electronics)
- Yoga Mat (Sports)
- T-Shirt (Apparel)
- Smart Watch (Electronics)

## 🧪 Testing

1. **Run the seed script:**
   ```bash
   npm run seed
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open test-api.html in your browser** for interactive testing

4. **Or use tools like Postman, Thunder Client, or curl**

## 📖 Learning Objectives

This project demonstrates:
- ✅ Designing nested document schemas
- ✅ Working with embedded arrays
- ✅ Querying nested fields
- ✅ Manipulating subdocuments
- ✅ Using projection to retrieve specific data
- ✅ Schema validation for nested structures
- ✅ Virtual properties and methods
- ✅ Indexing for performance

## 🔧 Error Handling

The API includes comprehensive error handling:
- Input validation errors
- Schema validation errors
- Database errors
- 404 Not Found errors
- Server errors

## 📄 License

ISC

## 👨‍💻 Author

Created as a learning project for understanding nested document structures in MongoDB.

---

**Happy Coding! 🚀**
