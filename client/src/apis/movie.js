import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
export const getAllMovies = async () => {
    const res = await axios.get(`${BASE_URL}/api/movies/get-all`, {
        withCredentials: true,
    });
    return res.data;
}
export const deleteMovie = async (id) => {
    const res = await axios.delete(`${BASE_URL}/api/movies/delete/${id}`, {
        withCredentials: true,
    });
    return res.data;
}