// build reducer for configure store

import { USER_ACTIONS, AUTH_ACTIONS, REGISTER_ACTIONS } from "./action";

const initialState = {
    loading: false,
    data: null,
    error: null,
    success: null
};
const initialStateAuth = {
    loading: false,
    error: null,
    user: null,
    token: null
}


const authReducer = (state = initialStateAuth, action) => {
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN:
            return { ...state, loading: true, error: null };

        case AUTH_ACTIONS.LOGIN_SUCCESS:
            return { ...state, loading: false, user: action.payload.user, error: null, token: action.payload.token };

        case AUTH_ACTIONS.LOGIN_ERROR:
            return { ...state, loading: false, data: null, error:  action.payload  };
        case AUTH_ACTIONS.LOGOUT:
            return { ...state, loading: false, user: null, error: null, token: null };

        default:
            return state;
    }
}



export {  authReducer };
