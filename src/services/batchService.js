import axios from 'axios';
const API_URL = 'http://localhost:3000/api/batches';

const getHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const getAllBatches = async () => {
    const res = await axios.get(API_URL, getHeaders());
    return res.data;
};

export const createBatch = async (data) => {
    const res = await axios.post(API_URL, data, getHeaders());
    return res.data;
};

export const deleteBatch = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`, getHeaders());
    return res.data;
};