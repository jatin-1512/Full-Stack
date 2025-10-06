const express = require('express');
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

// Route: /api/students
router.route('/')
  .get(getAllStudents)      // GET all students
  .post(createStudent);     // CREATE a new student

// Route: /api/students/:id
router.route('/:id')
  .get(getStudentById)      // GET student by ID
  .put(updateStudent)       // UPDATE student by ID
  .delete(deleteStudent);   // DELETE student by ID

module.exports = router;
