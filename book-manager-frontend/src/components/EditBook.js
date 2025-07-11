import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookForm from "./BookForm";
import api from "../utils/api";
import "../App.css";

const EditBook = () => {
  const [isbn, setIsbn] = useState("");
  const [book, setBook] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!isbn.trim()) {
      alert("Please enter a valid ISBN");
      return;
    }

    try {
      const res = await api.get(`/books/${isbn}`);
      setBook(res.data);
      setSubmitted(true);
    } catch (err) {
      alert("Book not found or error fetching book.");
      setSuccessMessage('');
    }
  };

  const handleUpdate = async (updatedBook) => {
    try {
      await api.put(`/books/update/${isbn}`, updatedBook);
      alert("Book updated successfully!");
      setSuccessMessage("Book updated successfully!");

      setTimeout(() => {
        navigate("/books");
      }, 1500); 
    } catch (err) {
      alert("Error updating book.");
      setSuccessMessage('');
    }
  };

  return (
    <div className="book-list-container">
      <h2>Edit Book by ISBN</h2>
      {successMessage && (
        <p className="edit-success-message">{successMessage}</p>
      )}

      {!submitted ? (
        <>
          <input
            type="text"
            placeholder="Enter ISBN"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="isbn-input"
          /><br /><br />
          <button onClick={handleSearch} className="nav-button">Edit Book</button>
        </>
      ) : (
        book && (
          <BookForm
            onSubmit={handleUpdate}
            initialData={book}
            isEditing={true}
          />
        )
      )}
    </div>
  );
};
export default EditBook;
