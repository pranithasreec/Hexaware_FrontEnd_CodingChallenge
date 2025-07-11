import axios from "axios";

export const login = async (credentials) => {
  const response = await axios.post("http://localhost:8080/api/auth/login", credentials);
  return response.data;
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};
