
import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
import BookDetail from "./components/BookDetail";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import { isLoggedIn, logout } from "./utils/auth";
import DeleteBook from "./components/DeleteBook";
import './App.css';

function App() {
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/books" className="nav-link">Books</Link>
        {isLoggedIn() ? (
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/books/add" className="nav-link">Add Book</Link>
            <Link to="/books/edit" className="nav-link">Edit Book</Link>
            <button onClick={handleLogout} className="nav-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path="/books/add" element={
          <PrivateRoute><AddBook /></PrivateRoute>
        } />
        <Route path="/books/edit" element={
          <PrivateRoute><EditBook /></PrivateRoute>
        } />
        <Route path="/books/edit/:isbn" element={
          <PrivateRoute><EditBook /></PrivateRoute>
        } />
        <Route path="/books/delete" element={<PrivateRoute><DeleteBook /></PrivateRoute>} />
        <Route path="/books/:isbn" element={
          <PrivateRoute><BookDetail /></PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
