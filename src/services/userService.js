import api from '../api/axiosInstance';

// Obtener todos los usuarios (para UsersPage)
export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

// Obtener un usuario por ID (para EditUserPage)
export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

// Crear un nuevo usuario (para CreateUserPage)
export const createUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

// Actualizar datos de usuario (para EditUserPage)
export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

// Eliminar un usuario
export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

// Cambiar contraseña (para ChangePasswordUserPage)
export const changePassword = async (id, passwords) => {
  // Ajusta la ruta '/change-password' según tu backend
  const response = await api.put(`/users/change-password/${id}`, passwords);
  return response.data;
};