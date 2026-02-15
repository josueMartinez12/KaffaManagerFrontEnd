import api from "../api/axiosInstance";

export const getInvoices = async () => {
    const res = await api.get("/invoices");
    return res.data;
};

// Nueva función para buscar/filtrar (puedes pasarle el número de factura o nombre)
export const searchInvoices = async (term) => {
    const res = await api.get(`/invoices?search=${term}`);
    return res.data;
};

export const createInvoice = async (invoiceData) => {
    const res = await api.post("/invoices", invoiceData);
    return res.data;
};