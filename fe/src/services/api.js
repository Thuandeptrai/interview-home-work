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
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location = '/login';
        }

        return Promise.reject(err);
    }
)
export default api;