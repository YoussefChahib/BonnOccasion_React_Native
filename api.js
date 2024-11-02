// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.1:8080', 
});

export default api;
