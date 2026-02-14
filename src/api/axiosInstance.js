import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Forzamos el 3000 que es donde vive tu server
});

// Si manejas tokens de autenticación en el futuro, los agregas aquí
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;