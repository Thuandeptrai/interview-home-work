import api from "./api";

// Register a new user
const registerAPI = async (username, name, dob, password) => {
    const response = await api.post("/users/register", {
        username, password, name, dob
    });
    return response.data;
}
const loginAPI = async (username, password) => {
    const response = await api.post("/users/login", {
        username, password
    });
    return response.data;
}
export  {
    registerAPI ,
    loginAPI ,
}
