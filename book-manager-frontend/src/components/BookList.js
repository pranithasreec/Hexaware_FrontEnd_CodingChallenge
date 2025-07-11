import React, { useEffect, useState } from "react";
import api from "../utils/api";
import '../App.css';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
  api.get("/books")
    .then((res) => {
      console.log("BookList response:", res.data); 
      setBooks(res.data);
    })
    .catch((err) => {
      console.error("Error loading books:", err);
      alert("Error fetching books");
    });
}, []);


  return (
    <div className="book-list-container">
      <h2>All Books</h2>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <table className="book-table">
          <thead>
            <tr>
              <th>ISBN</th>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.isbn}>
                <td>{b.isbn}</td>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.publicationYear}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookList;
