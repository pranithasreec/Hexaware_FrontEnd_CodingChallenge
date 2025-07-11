
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

const BookDetail = () => {
  const { isbn } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    api.get(`/books/${isbn}`)
      .then((res) => setBook(res.data))
      .catch(() => alert("Book not found"));
  }, [isbn]);

  return (
    <div className="book-list-container">
      <h2>Book Details</h2>
      {book ? (
        <ul>
          <li><strong>ISBN:</strong> {book.isbn}</li>
          <li><strong>Title:</strong> {book.title}</li>
          <li><strong>Author:</strong> {book.author}</li>
          <li><strong>Year:</strong> {book.publicationYear}</li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookDetail;
