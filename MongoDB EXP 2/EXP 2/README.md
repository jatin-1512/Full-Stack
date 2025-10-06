# Student Management System

A RESTful API for managing student data built with Node.js, Express.js, and MongoDB using the Model-View-Controller (MVC) architecture pattern.

## 📋 Features

- ✅ Create new students
- ✅ Get all students
- ✅ Get student by ID
- ✅ Update student information
- ✅ Delete students
- ✅ Input validation
- ✅ Error handling
- ✅ MVC architecture
- ✅ Mongoose ODM

## 🏗️ Project Structure

```
EXP 2/
├── config/
│   └── database.js       # MongoDB connection configuration
├── controllers/
│   └── studentController.js  # Business logic for CRUD operations
├── models/
│   └── Student.js        # Mongoose schema and model
├── routes/
│   └── studentRoutes.js  # API route definitions
├── server.js             # Entry point
├── package.json          # Dependencies
└── README.md             # Documentation
```

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **dotenv** - Environment variables
- **cors** - Cross-Origin Resource Sharing

## 📦 Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd "EXP 2"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory:**
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/student_management
   ```

4. **Make sure MongoDB is running on your system**

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

### Base URL: `http://localhost:3000/api/students`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get a specific student by ID |
| POST | `/api/students` | Create a new student |
| PUT | `/api/students/:id` | Update a student by ID |
| DELETE | `/api/students/:id` | Delete a student by ID |

## 📝 API Usage Examples

### 1. Create a Student (POST)
```bash
POST http://localhost:3000/api/students
Content-Type: application/json

{
  "name": "Alice Johnson",
  "age": 20,
  "course": "Computer Science"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Student created successfully",
  "data": {
    "_id": "686f66da1801707c14d09e60",
    "name": "Alice Johnson",
    "age": 20,
    "course": "Computer Science",
    "createdAt": "2025-10-05T10:30:00.000Z",
    "updatedAt": "2025-10-05T10:30:00.000Z"
  }
}
```

### 2. Get All Students (GET)
```bash
GET http://localhost:3000/api/students
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "686f66da1801707c14d09e60",
      "name": "Alice Johnson",
      "age": 20,
      "course": "Computer Science",
      "createdAt": "2025-10-05T10:30:00.000Z",
      "updatedAt": "2025-10-05T10:30:00.000Z"
    }
  ]
}
```

### 3. Get Student by ID (GET)
```bash
GET http://localhost:3000/api/students/686f66da1801707c14d09e60
```

### 4. Update Student (PUT)
```bash
PUT http://localhost:3000/api/students/686f66da1801707c14d09e60
Content-Type: application/json

{
  "name": "Alice Johnson",
  "age": 21,
  "course": "Data Science"
}
```

### 5. Delete Student (DELETE)
```bash
DELETE http://localhost:3000/api/students/686f66da1801707c14d09e60
```

## 📊 Student Model Schema

```javascript
{
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  age: {
    type: Number,
    required: true,
    min: 5,
    max: 100
  },
  course: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 MVC Architecture Explanation

### Model (models/Student.js)
- Defines the data structure using Mongoose schema
- Handles data validation
- Provides interface to interact with MongoDB

### Controller (controllers/studentController.js)
- Contains business logic
- Processes requests and responses
- Handles CRUD operations
- Manages error handling

### Routes (routes/studentRoutes.js)
- Defines API endpoints
- Maps HTTP methods to controller functions
- Acts as the entry point for client requests

## 🔧 Error Handling

The API includes comprehensive error handling:
- Input validation errors
- Database errors
- 404 Not Found errors
- Server errors

## 📄 License

ISC

## 👨‍💻 Author

Created as a learning project for understanding MVC architecture with MongoDB.
