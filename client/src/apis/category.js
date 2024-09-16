import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
export const getAllCategory = async () => {
    const res = await axios.get(`${BASE_URL}/api/categories/get-all`, {
        withCredentials: true,
    });
    return res.data;
}