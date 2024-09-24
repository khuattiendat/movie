import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
export const getAllActor = async (token) => {
    const res = await axios.get(`${BASE_URL}/api/actors/get-all`, {
        withCredentials: true,
        headers: {
            token: `Bearer ${token}`,
        }
    });
    return res.data;
}
export const createActor = async (token, payload) => {
    const res = await axios.post(`${BASE_URL}/api/actors/create`, payload, {
        withCredentials: true,
        headers: {
            token: `Bearer ${token}`,
        }
    });
    return res.data;
}
export const getActorById = async (token, slug) => {
    const res = await axios.get(`${BASE_URL}/api/actors/get-one/${slug}`, {
        withCredentials: true,
        headers: {
            token: `Bearer ${token}`,
        }
    });
    return res.data;
}
export const updateActor = async (token, id, payload) => {
    const res = await axios.put(`${BASE_URL}/api/actors/update/${id}`, payload, {
        withCredentials: true,
        headers: {
            token: `Bearer ${token}`,
        }
    });
    return res.data;
}
export const deleteActor = async (token, id) => {
    const res = await axios.delete(`${BASE_URL}/api/actors/delete/${id}`, {
        withCredentials: true,
        headers: {
            token: `Bearer ${token}`,
        }
    });
    return res.data;
}
