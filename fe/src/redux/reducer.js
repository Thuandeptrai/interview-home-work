// build reducer for configure store

import { USER_ACTIONS, AUTH_ACTIONS, REGISTER_ACTIONS } from "./action";

const initialState = {
    loading: false,
    data: null,
    error: null,
};
const initialStateAuth = {
    loading: false,
    error: null,
    user: null,
    token: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_ACTIONS.FETCH_USER:
            return { ...state, loading: true };

        case USER_ACTIONS.FETCH_USER_SUCCESS:
            return { ...state, loading: false, data: action.user, error: null };

        case USER_ACTIONS.FETCH_USER_ERROR:
            return { ...state, loading: false, data: null, error: action.error };
        default:
            return state;
    }
}
const authReducer = (state = initialStateAuth, action) => {
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN:
            return { ...state, loading: true };

        case AUTH_ACTIONS.LOGIN_SUCCESS:
            return { ...state, loading: false, user: action.payload.user, error: null, token: action.payload.token };

        case AUTH_ACTIONS.LOGIN_ERROR:
            return { ...state, loading: false, data: null, error: action.error };
        case AUTH_ACTIONS.SET_USER_DATA:
            console.log(action)

            return { ...state, user: action.payload.user, token: action.payload.token };

        default:
            return state;
    }
}

const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_ACTIONS.REGISTER:
            return { ...state, loading: true };
        case REGISTER_ACTIONS.REGISTER_SUCCESS:
            return { ...state, loading: false, error: null };
        case REGISTER_ACTIONS.REGISTER_ERROR:
            console.log(action.payload)
            return { ...state, loading: false, data: null, error: action.payload };
        default:
            return state;
    }
}


export { userReducer, authReducer, registerReducer };
