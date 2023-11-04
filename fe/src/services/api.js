import axios from 'axios';
import {API_URL} from '../config/config';
// clear the auth state redux when user got 401 error
import store from '../index';
import { AUTH_ACTIONS } from '../redux/action';
const api = axios.create({
    baseURL: API_URL,
});
// intercept any request 401 responses then redirect to login
api.interceptors.response.use(
    res => res,
    err => {

        if (err.response.status === 401) {
            store.dispatch({ type: AUTH_ACTIONS.LOGOUT })
            window.location = '/login';
        }
        return Promise.reject(err);
    }
)
// get token from local storage
const token = localStorage.getItem('token');
// set token to request header
if (token) {
    api.defaults.headers.common['Authorization'] = `${token}`;
}
export default api;