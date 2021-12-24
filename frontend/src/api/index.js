import axios from "axios";

const API_ENDPOINT = "http://localhost:3000/api/post";

export const fetchPosts = async () => {
  console.log("fetchPosts is called");
  return await axios.get(API_ENDPOINT);
};
