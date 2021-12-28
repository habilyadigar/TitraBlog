import axios from 'axios';

const API_ENDPOINT = 'http://localhost:3000/api/post';

export const fetchPosts = async () => {
  return await axios.get(API_ENDPOINT);
};

export const fetchSinglePost = async id => {
  return await axios.get(`${API_ENDPOINT}/${id}`);
};
