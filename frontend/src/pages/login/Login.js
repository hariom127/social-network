import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./login.css";
import { CircularProgress } from "@material-ui/core";
import { login } from "../../redux/action/authAction";

export default function Login() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isFetching = auth.loading;
  const email = useRef();
  const password = useRef();
  const handelSubmit = (e) => {
    e.preventDefault();
    const userCredentials = {
      email: email.current.value,
      password: password.current.value,
    };
    dispatch(login(userCredentials));
  };

  // if user loged in redirect to on dashboard
  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }
  console.log(auth.loading);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handelSubmit}>
            <input
              id="email"
              ref={email}
              required
              placeholder="Email"
              type="email"
              className="loginInput"
            />
            <input
              id="password"
              ref={password}
              required
              type="password"
              placeholder="Password"
              className="loginInput"
              autoComplete=""
            />
            <button className="loginButton" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                "Login"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
