import api from "../api/axiosInstance";

// 1. Obtener todos los productos
export const getProducts = async () => {
    const response = await api.get("/products");
    return response.data;
};

// 2. OBTENER UN SOLO PRODUCTO (Esta es la que te falta)
export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

// 3. Crear producto
export const createProduct = async (productData) => {
    const response = await api.post("/products", productData);
    return response.data;
};

// 4. Actualizar producto
export const updateProduct = async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
};

// 5. Eliminar producto
export const deleteProduct = async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
};