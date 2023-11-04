// get Post api
import api from "./api";
const getPostAPI = async (page, limit) => {
    const response = await api.get(`/posts?pageSize=${limit}&pageIndex=${page}`);
    return response.data;
};
const createPostAPI = async (title, content) => {
    const response = await api.post('/posts', { title, content })
    return response.data
}
const updatePostAPI = async (id, title, content) => {
    const response = await api.put(`/posts/${id}`, { title, content })
    return response.data
}
const deletePostAPI = async (id) => {
    const response = await api.delete(`/posts/${id}`)
    return response.data
}
const findPostByKeyWord = async (keyword, page, limit) => {
    const response = await api.get(`/posts/keyword?keyword=${keyword}&pageSize=${limit}&pageIndex=${page}`)
    return response.data

}

export {
    getPostAPI,
    createPostAPI,
    updatePostAPI,
    deletePostAPI,
    findPostByKeyWord
}