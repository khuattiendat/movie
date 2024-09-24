import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
export const getAllMovies = async (token) => {
    const res = await axios.get(`${BASE_URL}/api/movies/get-all`, {
        withCredentials: true,
        headers: {
            token: `Bearer ${token}`,
        },
    });
    return res.data;
}
export const deleteMovie = async (token, id) => {
    const res = await axios.delete(`${BASE_URL}/api/movies/delete/${id}`, {
        withCredentials: true,
        headers: {
            token: `Bearer ${token}`,
        },
    });
    return res.data;
}
export const getMovieByIdOrSlug = async (token, slug) => {
    const res = await axios.get(`${BASE_URL}/api/movies/get-one/${slug}`, {
        withCredentials: true,
        headers: {
            token: `Bearer ${token}`,
        },
    });
    return res.data;
}
export const createMovie = async (token, payload) => {
    const res = await axios.post(`${BASE_URL}/api/movies/create`, payload, {
        withCredentials: true,
        headers: {
            token: `Bearer ${token}`,
        },
    });
    return res.data;
}
export const updateMovie = async (token, id, payload) => {
    const res = await axios.put(`${BASE_URL}/api/movies/update/${id}`, payload, {
        withCredentials: true,
        headers: {
            token: `Bearer ${token}`,
        },
    });
    return res.data;
}