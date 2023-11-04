import api from "./api";

const getCommentByPost = async (postId) => {
    const response = await api.get(`/comments/${postId}`);
    return response.data;
}
const createComment = async (postId, content) => {
    const response = await api.post(`/comments/${postId}`, { content });
    return response.data;
}
const deleteComment = async (id) => {
    const response = await api.delete(`/comments/${id}`);
    return response.data;
}
const updateComment = async (id, content) => {
    const response = await api.put(`/comments/${id}`, { content });
    return response.data;
}

export  {
    getCommentByPost,
    createComment,
    deleteComment,
    updateComment,
}