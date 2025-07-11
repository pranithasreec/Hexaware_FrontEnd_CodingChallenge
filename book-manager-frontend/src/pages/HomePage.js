
import React from "react";
import { Link } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";
import "../App.css";

const HomePage = () => {
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="home-container">
      <h1>Welcome to Book Manager</h1>
      <p>Manage your library with ease.</p>

      <div className="home-buttons">
        <Link to="/books" className="nav-button">View All Books</Link>
        {isLoggedIn() && (
          <>
            <Link to="/dashboard" className="nav-button">Dashboard</Link>
            <Link to="/books/add" className="nav-button">Add Book</Link>
            <Link to="/books/edit" className="nav-button">Edit Book</Link>
            <Link to="/books/delete" className="nav-button">Delete Book</Link>
            <button onClick={handleLogout} className="nav-button">Logout</button>
          </>
        )}
        {!isLoggedIn() && (
          <>
            <Link to="/login" className="nav-button">Login</Link>
            <Link to="/register" className="nav-button">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
