import { useContext } from "react";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  // const user = localStorage.getItem("user");
  console.log("app.js", user);
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {user ? <Home /> : <Redirect to="/register" />}
        </Route>
        <Route path="/login" exact>
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register" exact>
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/profile/:username" exact>
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
