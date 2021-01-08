import API from "../../utils/API";
import { SIGN_UP, LOGIN, LOGOUT } from "../types";

export const signupUser = (email, password) => async (dispatch) => {
    try {
        const config = { headers: { "Content-Type": "application/json" } };
        const body = { email, password };
        const res = await API.post("api/v1/auth/signup", body, config);
        dispatch({ type: SIGN_UP, payload: res.data.user });
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = (email, password) => async (dispatch) => {
    try {
        const config = { headers: { "Content-Type": "application/json" } };
        const body = { email, password };
        const res = await API.post("api/v1/auth/login", body, config);
        dispatch({ type: LOGIN, payload: res.data.user });
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        const res = await API.get('api/v1/auth/logout');
        dispatch({ type: LOGOUT })
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

export const getSecret = () => async (dispatch) => {
    try {
        const res = await API.get('api/v1/auth/secretcontent');
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}