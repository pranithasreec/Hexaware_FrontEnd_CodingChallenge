
import React, { useEffect, useState } from "react";
import api from "../utils/api";
import BookForm from "../components/BookForm";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(null);

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = async (book) => {
  try {
    await api.post("/books/add", book);
    fetchBooks(); 
  } catch (err) {
    console.error("Add Book Error:", err.response?.data || err.message);
    alert("Error adding book");
  }
};

  const updateBook = async (book) => {
    try {
      await api.put(`/books/update/${book.isbn}`, book);
      setEditBook(null);
      fetchBooks();
    } catch (err) {
      alert("Error updating book");
    }
  };

  const deleteBook = async (isbn) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await api.delete(`/books/delete/${isbn}`);
      fetchBooks();
    } catch (err) {
      alert("Error deleting book");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Dashboard</h2>
      <BookForm
        onSubmit={editBook ? updateBook : addBook}
        initialData={editBook}
        isEditing={!!editBook}
      />
      <hr />
      <h3>Book List</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.isbn}>
              <td>{b.isbn}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.publicationYear}</td>
              <td>
                <button onClick={() => setEditBook(b)}>Edit</button>{" "}
                <button onClick={() => deleteBook(b.isbn)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
