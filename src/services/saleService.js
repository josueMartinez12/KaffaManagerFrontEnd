import api from "../api/axiosInstance";

export const getSales = async () => {
  const res = await api.get("/sales");
  return res.data;
};

export const processSale = async (saleData) => {
  // saleData debe incluir: items, cliente, total, metodoPago
  const res = await api.post("/sales/checkout", saleData);
  return res.data;
};

export const cancelSale = async (id) => {
  const res = await api.put(`/sales/${id}/cancel`);
  return res.data;
};

export const deleteSale = async (id) => {
  const res = await api.delete(`/sales/${id}`);
  return res.data;
};