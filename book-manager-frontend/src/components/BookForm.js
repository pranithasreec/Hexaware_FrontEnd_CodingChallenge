import React, { useState, useEffect } from "react";
import '../App.css';

const BookForm = ({ onSubmit, initialData = {}, isEditing = false }) => {
  const [form, setForm] = useState({
    isbn: "",
    title: "",
    author: "",
    publicationYear: ""
  });

  useEffect(() => {
    if (isEditing && initialData) {
      setForm(initialData);
    }
  }, [initialData, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "publicationYear" ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    if (!isEditing) {
      setForm({ isbn: "", title: "", author: "", publicationYear: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h3>{isEditing ? "Edit Book" : "Add Book"}</h3>
      {!isEditing && (
        <>
          <input
            name="isbn"
            placeholder="ISBN"
            value={form.isbn}
            onChange={handleChange}
            required
          />
        </>
      )}
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="author"
        placeholder="Author"
        value={form.author}
        onChange={handleChange}
        required
      />
      <input
        name="publicationYear"
        placeholder="Year"
        type="number"
        value={form.publicationYear}
        onChange={handleChange}
        required
      />
      <button type="submit">{isEditing ? "Update" : "Add"}</button>
    </form>
  );
};

export default BookForm;
