import api from "../api/axiosInstance";

export const getOrders = async () => {
    const res = await api.get("/orders");
    return res.data;
};

export const getOrderById = async (id) => {
    const res = await api.get(`/orders/${id}`);
    return res.data;
};

export const createOrder = async (orderData) => {
    const res = await api.post("/orders", orderData);
    return res.data;
};

export const updateOrderStatus = async (id, estado) => {
    const res = await api.put(`/orders/${id}/status`, { estado });
    return res.data;
};