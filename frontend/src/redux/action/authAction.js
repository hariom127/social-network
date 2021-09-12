import axios from "../../helper/axios";
import { ActionTypes } from "../constant/action-type";

export const login = (userCredentials) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.LOGIN_REQUEST, payload: {} });
    const res = await axios.post(`/users/login`, {
      ...userCredentials, //Spread oprater
    });

    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: { token, user } });
    } else {
      if (res.status === 400) {
        dispatch({
          type: ActionTypes.LOGIN_FAILER,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.SIGNUP_REQUEST });
    const res = await axios.post(`/admin/signup`, {
      ...user, //Spread oprater
    });
    if (res.status === 200) {
      const { message } = res.data;
      dispatch({ type: ActionTypes.SIGNUP_SUCCESS, payload: { message } });
    } else {
      const { message } = res.data;
      if (res.status === 400) {
        dispatch({ type: ActionTypes.SIGNUP_FAILED, payload: { message } });
      }
      if (res.status === 422) {
        console.log(res, "action");
        dispatch({ type: ActionTypes.SIGNUP_FAILED, payload: { message } });
      }
      dispatch({ type: ActionTypes.SIGNUP_FAILED, payload: { message } });
    }
  };
};

export const isUserLogedIn = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: { token, user } });
    } else {
      dispatch({
        type: ActionTypes.LOGIN_FAILER,
        payload: { error: "Login failed" },
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.LOGOUT_REQUEST });
    const res = await axios.post(`/admin/logout`);
    if (res.status === 200) {
      localStorage.clear();
      dispatch({ type: ActionTypes.LOGOUT_SUCCESS });
    } else {
      dispatch({ type: ActionTypes.LOGOUT_FAILED, payload: res.data.error });
    }
  };
};
