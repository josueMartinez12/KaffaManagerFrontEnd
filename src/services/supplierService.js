import api from "../api/axiosInstance";

export const getSuppliers = async () => {
    const res = await api.get("/suppliers");
    return res.data;
};

// Agregar esta función también
export const getSupplierById = async (id) => {
    const res = await api.get(`/suppliers/${id}`);
    return res.data;
};

export const createSupplier = async (data) => {
    const res = await api.post("/suppliers", data);
    return res.data;
};

export const updateSupplier = async (id, data) => {
    const res = await api.put(`/suppliers/${id}`, data);
    return res.data;
};

export const deleteSupplier = async (id) => {
    const res = await api.delete(`/suppliers/${id}`);
    return res.data;
};