# Product CRUD API with Mongoose

A complete Node.js application demonstrating CRUD (Create, Read, Update, Delete) operations on a MongoDB database using Mongoose ODM and Express.js.

## Features

- ✅ Complete CRUD operations for Product model
- ✅ Data validation and error handling
- ✅ MongoDB integration with Mongoose
- ✅ RESTful API design
- ✅ Query parameters for filtering and pagination
- ✅ Timestamps for tracking creation and updates
- ✅ Category-based product filtering
- ✅ Price range filtering

## Product Model Schema

```javascript
{
  name: String (required, 3-100 characters),
  price: Number (required, must be >= 0),
  category: String (required, enum values),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

### Available Categories
- Electronics
- Clothing
- Food
- Books
- Toys
- Accessories
- Stationery
- Other

## Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd /Users/shubhamupadhyay/Documents/MONGODB
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Update the `MONGODB_URI` with your MongoDB connection string:
     - For local MongoDB: `mongodb://localhost:27017/products_db`
     - For MongoDB Atlas: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>`

4. **Make sure MongoDB is running**
   - If using local MongoDB: Start MongoDB service
   - If using MongoDB Atlas: Ensure your cluster is active

## Usage

### Start the server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### 1. Create a Product
**POST** `/api/products`

**Request Body:**
```json
{
  "name": "Laptop",
  "price": 1200,
  "category": "Electronics"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "...",
    "name": "Laptop",
    "price": 1200,
    "category": "Electronics",
    "createdAt": "2025-10-05T...",
    "updatedAt": "2025-10-05T...",
    "__v": 0
  }
}
```

### 2. Get All Products
**GET** `/api/products`

**Query Parameters (optional):**
- `category` - Filter by category
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `sort` - Sort field (e.g., `price`, `-price`, `name`)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Example:**
```
GET /api/products?category=Electronics&minPrice=500&maxPrice=2000&sort=-price&page=1&limit=5
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "total": 15,
  "page": 1,
  "totalPages": 3,
  "data": [...]
}
```

### 3. Get Product by ID
**GET** `/api/products/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Laptop",
    "price": 1200,
    "category": "Electronics",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### 4. Update Product
**PUT** `/api/products/:id`

**Request Body:**
```json
{
  "name": "Gaming Laptop",
  "price": 1500,
  "category": "Electronics"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "_id": "...",
    "name": "Gaming Laptop",
    "price": 1500,
    "category": "Electronics",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### 5. Delete Product
**DELETE** `/api/products/:id`

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": {
    "_id": "...",
    "name": "Laptop",
    "price": 1200,
    "category": "Electronics"
  }
}
```

### 6. Get Products by Category
**GET** `/api/products/category/:category`

**Example:**
```
GET /api/products/category/Electronics
```

### 7. Delete All Products
**DELETE** `/api/products`

**Response:**
```json
{
  "success": true,
  "message": "Successfully deleted 10 products",
  "deletedCount": 10
}
```

## Testing the API

You can test the API using:

1. **cURL**
   ```bash
   # Create a product
   curl -X POST http://localhost:3000/api/products \
     -H "Content-Type: application/json" \
     -d '{"name":"Smartphone","price":699,"category":"Electronics"}'

   # Get all products
   curl http://localhost:3000/api/products

   # Get product by ID
   curl http://localhost:3000/api/products/<product_id>

   # Update product
   curl -X PUT http://localhost:3000/api/products/<product_id> \
     -H "Content-Type: application/json" \
     -d '{"name":"iPhone","price":999,"category":"Electronics"}'

   # Delete product
   curl -X DELETE http://localhost:3000/api/products/<product_id>
   ```

2. **Postman or Thunder Client** (VS Code extension)
3. **Web Browser** (for GET requests)

## Project Structure

```
MONGODB/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   └── productController.js # Request handlers for CRUD operations
├── models/
│   └── Product.js           # Mongoose schema and model
├── routes/
│   └── productRoutes.js     # API route definitions
├── .env                     # Environment variables (not in git)
├── .env.example             # Example environment configuration
├── package.json             # Project dependencies and scripts
├── server.js                # Main application entry point
└── README.md                # This file
```

## Error Handling

The API includes comprehensive error handling for:

- ✅ Validation errors (missing or invalid fields)
- ✅ Not found errors (invalid IDs)
- ✅ Database connection errors
- ✅ Server errors (500)
- ✅ Duplicate entries
- ✅ Invalid ObjectId format

## Validation Rules

- **Name**: Required, 3-100 characters, trimmed
- **Price**: Required, must be >= 0, numeric
- **Category**: Required, must be one of the predefined categories

## Additional Features

- Automatic timestamps (createdAt, updatedAt)
- Database indexes for improved query performance
- Graceful shutdown handling
- CORS support for frontend integration
- Pagination support
- Filtering and sorting capabilities
- Health check endpoint (`/health`)

## Environment Variables

| Variable      | Description                    | Default                              |
|---------------|--------------------------------|--------------------------------------|
| MONGODB_URI   | MongoDB connection string      | mongodb://localhost:27017/products_db|
| PORT          | Server port number             | 3000                                 |
| NODE_ENV      | Environment (dev/production)   | development                          |

## Contributing

Feel free to submit issues and enhancement requests!

## License

ISC
