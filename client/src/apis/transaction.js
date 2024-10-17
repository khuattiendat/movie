import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
export const getAllTransaction = async (token) => {
    const res = await axios.get(`${BASE_URL}/api/transactions/get-all`, {
        withCredentials: true,
        headers: {
            token: `Bearer ${token}`,
        },
    });
    return res.data;
}
export const updateTransaction = async (id, data, token) => {
    const res = await axios.put(`${BASE_URL}/api/transactions/update/${id}`, data, {
        withCredentials: true,
        headers: {
            token: `Bearer ${token}`,
        },
    });
    return res.data;
}