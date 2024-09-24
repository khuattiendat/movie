import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
export const login = async (payload) => {
    const res = await axios.post(`${BASE_URL}/api/users/login`, payload, {
        withCredentials: true,
    });
    return res.data;
}
export const getAllUser = async (token) => {
    const res = await axios.get(`${BASE_URL}/api/users/get-all`, {
        withCredentials: true,
        headers: {
            token: `Bearer ${token}`,
        },
    });
    return res.data;
}
export const deleteUser = async (token, id) => {
    const res = await axios.delete(`${BASE_URL}/api/users/delete/${id}`, {
        withCredentials: true,
        headers: {
            token: `Bearer ${token}`,
        },
    });
    return res.data;
}
export const createUser = async (token, payload) => {
    const res = await axios.post(`${BASE_URL}/api/users/register`, payload, {
        withCredentials: true,
        headers: {
            token: `Bearer ${token}`,
        },
    });
    return res.data;
}
export const getUserById = async (token, id) => {
    const res = await axios.get(`${BASE_URL}/api/users/get-one/${id}`, {
        withCredentials: true,
        headers: {
            token: `Bearer ${token}`,
        },
    });
    return res.data;
}
export const updateUser = async (token, id, payload) => {
    const res = await axios.put(`${BASE_URL}/api/users/update/${id}`, payload, {
        withCredentials: true,
        headers: {
            token: `Bearer ${token}`,
        },
    });
    return res.data;
}