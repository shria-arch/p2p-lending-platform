import axios from "axios";

const API_URL = "http://16.16.34.145:3001/api/auth";

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);

  return response.data;
};