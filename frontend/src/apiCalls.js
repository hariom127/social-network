import axios from "./helper/axios";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("users/login", userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
    localStorage.setItem("user", res.data ? res.data : null);
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};
