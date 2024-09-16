import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
export const login = async (payload) => {
    const res = await axios.post(`${BASE_URL}/api/users/login`, payload, {
        withCredentials: true,
    });
    return res.data;
}
export const getAllUser = async (page = 1, search = '') => {
    const res = await axios.get(`${BASE_URL}/api/users/get-all?page=${page}&search=${search}`, {
        withCredentials: true,
    });
    return res.data;
}
export const deleteUser = async (id) => {
    const res = await axios.delete(`${BASE_URL}/api/users/delete/${id}`, {
        withCredentials: true,
    });
    return res.data;
}
export const createUser = async (payload) => {
    const res = await axios.post(`${BASE_URL}/api/users/register`, payload, {
        withCredentials: true,
    });
    return res.data;
}
export const getUserById = async (id) => {
    const res = await axios.get(`${BASE_URL}/api/users/get-one/${id}`, {
        withCredentials: true,
    });
    return res.data;
}
export const updateUser = async (id, payload) => {
    const res = await axios.put(`${BASE_URL}/api/users/update/${id}`, payload, {
        withCredentials: true,
    });
    return res.data;
}