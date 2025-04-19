import axios from 'axios';

const LOCALHOST = 'http://localhost:4647';
export const API_BASE_URL = "http://localhost:4647";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  // console.log("Token used in request:", token); 
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});


export default api;
