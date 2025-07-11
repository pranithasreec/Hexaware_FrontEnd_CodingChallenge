import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, setToken } from "../utils/auth";
import "../App.css";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = await login(form); 
      if (token && token.startsWith("ey")) {
        setToken(token);
        alert("Login Successful ");
        navigate("/Home");
      } else {
        setError("Invalid token received.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleSubmit} className="form-content">
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="form-input"
        /><br />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="form-input"
        /><br />
        <button type="submit" className="form-button">Login</button>
      </form>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default Login;
