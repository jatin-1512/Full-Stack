const mongoose = require('mongoose');

// Define the Student schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [5, 'Age must be at least 5'],
    max: [100, 'Age cannot exceed 100']
  },
  course: {
    type: String,
    required: [true, 'Course is required'],
    trim: true,
    minlength: [2, 'Course name must be at least 2 characters long'],
    maxlength: [100, 'Course name cannot exceed 100 characters']
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create and export the Student model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
