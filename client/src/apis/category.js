import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
export const getAllCategory = async () => {
    const res = await axios.get(`${BASE_URL}/api/categories/get-all`, {
        withCredentials: true,
    });
    return res.data;
}
export const createCategory = async (payload) => {
    const res = await axios.post(`${BASE_URL}/api/categories/create`, payload, {
        withCredentials: true,
    });
    return res.data;
}
export const getCategoryBySlugOrId = async (slug) => {
    const res = await axios.get(`${BASE_URL}/api/categories/get-one/${slug}`, {
        withCredentials: true,
    });
    return res.data;
}
export const updateCategory = async (id, payload) => {
    const res = await axios.put(`${BASE_URL}/api/categories/update/${id}`, payload, {
        withCredentials: true,
    });
    return res.data;
}
export const deleteCategory = async (id) => {
    const res = await axios.delete(`${BASE_URL}/api/categories/delete/${id}`, {
        withCredentials: true,
    });
    return res.data;
}