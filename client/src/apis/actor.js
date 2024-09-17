import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
export const getAllActor = async () => {
    const res = await axios.get(`${BASE_URL}/api/actors/get-all`, {
        withCredentials: true,
    });
    return res.data;
}
export const createActor = async (payload) => {
    const res = await axios.post(`${BASE_URL}/api/actors/create`, payload, {
        withCredentials: true,
    });
    return res.data;
}
export const getActorById = async (slug) => {
    const res = await axios.get(`${BASE_URL}/api/actors/get-one/${slug}`, {
        withCredentials: true,
    });
    return res.data;
}
export const updateActor = async (id, payload) => {
    const res = await axios.put(`${BASE_URL}/api/actors/update/${id}`, payload, {
        withCredentials: true,
    });
    return res.data;
}
export const deleteActor = async (id) => {
    const res = await axios.delete(`${BASE_URL}/api/actors/delete/${id}`, {
        withCredentials: true,
    });
    return res.data;
}
