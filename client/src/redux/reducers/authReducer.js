import { SIGN_UP, LOGIN, LOGOUT } from "../types";
const INITIAL_STATE = {
    user: {},
    id: '',
    email: '',
    clearance: '',
    loggedon: false,
};

const authReducer = (state = INITIAL_STATE, actions) => {
    const { type, payload } = actions;
    switch (type) {
        case SIGN_UP:
            return {
                ...state,
                user: payload,
                id: payload._id,
                email: payload.email,
                clearance: payload.clearance,
                loggedon: true
            };
        case LOGIN:
            return {
                ...state,
                user: payload,
                id: payload._id,
                email: payload.email,
                clearance: payload.clearance,
                loggedon: true
            };
        case LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default authReducer;