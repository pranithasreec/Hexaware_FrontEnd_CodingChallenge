import React, { useState } from 'react';
import '../App.css';

const DeleteBook = () => {
  const [isbn, setIsbn] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleDelete = async () => {
    if (!isbn) {
      alert('Please enter a valid ISBN');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:8080/api/books/delete/${isbn}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const msg = `Book with ISBN ${isbn} deleted successfully`;
        alert(msg);
        setSuccessMessage(msg);
        setIsbn('');
      } else {
        const responseClone = response.clone();
        let errorMessage;

        try {
          const errorData = await responseClone.json();
          errorMessage = errorData.message || "Unknown error";
        } catch (jsonError) {
          const textError = await response.text(); 
          errorMessage = textError;
        }

        alert(`Failed to delete: ${errorMessage}`);
        setSuccessMessage('');
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className="delete-book-container">
      <h2>Delete Book by ISBN</h2>
      <input
        type="text"
        placeholder="Enter ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        className="delete-book-input"
      />
      <button onClick={handleDelete} className="delete-book-button">
        Delete Book
      </button>

     
      {successMessage && (
        <p className="delete-success-message">{successMessage}</p>
      )}
    </div>
  );
};

export default DeleteBook;
