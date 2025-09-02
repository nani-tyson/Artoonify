// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: ' https://artoonify.onrender.com',  // Adjust the backend URL if necessary
});

export default instance;
