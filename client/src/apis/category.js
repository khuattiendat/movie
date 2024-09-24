import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
export const getAllCategory = async (token) => {
    const res = await axios.get(`${BASE_URL}/api/categories/get-all`, {
        withCredentials: true,
        headers: {
            token: `Bearer ${token}`,
        },
    });
    return res.data;
}
export const createCategory = async (token, payload) => {
    const res = await axios.post(`${BASE_URL}/api/categories/create`, payload, {
        withCredentials: true,
        headers: {
            token: `Bearer ${token}`,
        },
    });
    return res.data;
}
export const getCategoryBySlugOrId = async (token, slug) => {
    const res = await axios.get(`${BASE_URL}/api/categories/get-one/${slug}`, {
        withCredentials: true,
        headers: {
            token: `Bearer ${token}`,
        },
    });
    return res.data;
}
export const updateCategory = async (token, id, payload) => {
    const res = await axios.put(`${BASE_URL}/api/categories/update/${id}`, payload, {
        withCredentials: true,
        headers: {
            token: `Bearer ${token}`,
        },
    });
    return res.data;
}
export const deleteCategory = async (token, id) => {
    const res = await axios.delete(`${BASE_URL}/api/categories/delete/${id}`, {
        withCredentials: true,
        headers: {
            token: `Bearer ${token}`,
        },
    });
    return res.data;
}