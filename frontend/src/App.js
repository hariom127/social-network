import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from "./component/HOC/PrivateRoute";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { isUserLogedIn } from "./redux/action/authAction";

function App() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLogedIn());
    }
  }, []);
  return (
    <>
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/profile" exact component={Profile} />
        <Route path="/signin" component={Login} />
        <Route path="/signup" component={Register} />
      </Switch>
    </>
  );
}

export default App;
