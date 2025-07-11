import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookForm from "./BookForm";
import api from "../utils/api";

const AddBook = ({ onBookAdded }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleAdd = async (book) => {
    try {
      await api.post("/books/add", book);
      alert("Book added successfully!");
      setSuccessMessage("Book added successfully!");
      if (onBookAdded) onBookAdded();

      
      setTimeout(() => {
        navigate("/books");
      }, 1500); 
    } catch (err) {
      alert("Error adding book");
      setSuccessMessage('');
    }
  };

  return (
    <div className="book-list-container">
      <h2>Add New Book</h2>

    
      {successMessage && (
        <p className="add-success-message">{successMessage}</p>
      )}

      <BookForm onSubmit={handleAdd} isEditing={false} />
    </div>
  );
};

export default AddBook;
