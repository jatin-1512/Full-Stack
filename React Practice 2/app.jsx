import React, { useState } from "react";

export default function LibraryApp() {
  const [books, setBooks] = useState([
    { title: "1984", author: "George Orwell" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { title: "To Kill a Mockingbird", author: "Harper Lee" },
  ]);

  const [search, setSearch] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  // Filter books by search
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  // Add new book
  const handleAddBook = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim()) return;
    setBooks([...books, { title: newTitle, author: newAuthor }]);
    setNewTitle("");
    setNewAuthor("");
  };

  // Remove a book
  const handleRemoveBook = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Library Management</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by title or author"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.inputFull}
      />

      {/* Add book form */}
      <form onSubmit={handleAddBook} style={styles.form}>
        <input
          type="text"
          placeholder="New book title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="New book author"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.addBtn}>
          Add Book
        </button>
      </form>

      {/* Book list */}
      <ul style={styles.list}>
        {filteredBooks.map((book, index) => (
          <li key={index} style={styles.listItem}>
            <span>
              <strong>{book.title}</strong> by {book.author}
            </span>
            <button
              style={styles.removeBtn}
              onClick={() => handleRemoveBook(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Styling
const styles = {
  container: {
    border: "1px solid #333",
    padding: "15px",
    margin: "20px auto",
    width: "70%",
  },
  heading: {
    marginBottom: "10px",
  },
  inputFull: {
    width: "100%",
    padding: "6px",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    gap: "8px",
    marginBottom: "15px",
  },
  input: {
    flex: 1,
    padding: "6px",
  },
  addBtn: {
    padding: "6px 12px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px",
    marginBottom: "6px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  removeBtn: {
    padding: "4px 10px",
  },
};
