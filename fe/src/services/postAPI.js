// get Post api
import api from "./api";
const getPostAPI = async (page, limit) => {
    const response = await api.get(`/posts?page=${page}&limit=${limit}`);
    return response.data;
};