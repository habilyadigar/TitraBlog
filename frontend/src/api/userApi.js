import axios from 'axios';

const API_ENDPOINT = 'http://localhost:3000/api/user';

export const getUser = async id => {
  return await axios.get(`${API_ENDPOINT}/${id}`);
};

export const login = async (email, password) => {
  return await axios.post(`${API_ENDPOINT}/login`, { email, password });
};

export const register = async (name, email, password) => {
  return await axios.post(`${API_ENDPOINT}/register`, {
    name,
    email,
    password,
  });
};

export const updateUser = async (id, updatedPost) => {
  return await axios.patch(`${API_ENDPOINT}/${id}`, updatedPost);
};
