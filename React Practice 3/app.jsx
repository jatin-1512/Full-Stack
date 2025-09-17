// App.jsx
import { useState } from "react";
import "./App.css";

// Base Person class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getInfo() {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}

// Student subclass
class Student extends Person {
  constructor(name, age, course) {
    super(name, age);
    this.course = course;
  }

  getInfo() {
    return `${super.getInfo()}, Course: ${this.course}`;
  }
}

// Teacher subclass
class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  getInfo() {
    return `${super.getInfo()}, Subject: ${this.subject}`;
  }
}

function App() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [formData, setFormData] = useState({
    type: "student",
    name: "",
    age: "",
    courseOrSubject: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.type === "student") {
      const newStudent = new Student(
        formData.name,
        formData.age,
        formData.courseOrSubject
      );
      setStudents([...students, newStudent]);
    } else {
      const newTeacher = new Teacher(
        formData.name,
        formData.age,
        formData.courseOrSubject
      );
      setTeachers([...teachers, newTeacher]);
    }

    setFormData({ type: "student", name: "", age: "", courseOrSubject: "" });
  };

  return (
    <div className="container">
      <h1>Person Management System</h1>

      {/* Input Form */}
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Type:
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </label>

        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          {formData.type === "student" ? "Course" : "Subject"}:
          <input
            type="text"
            name="courseOrSubject"
            value={formData.courseOrSubject}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Add {formData.type}</button>
      </form>

      {/* Display Tables */}
      <div className="tables">
        <div>
          <h2>Students</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Course</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={i}>
                  <td>{s.name}</td>
                  <td>{s.age}</td>
                  <td>{s.course}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2>Teachers</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t, i) => (
                <tr key={i}>
                  <td>{t.name}</td>
                  <td>{t.age}</td>
                  <td>{t.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
