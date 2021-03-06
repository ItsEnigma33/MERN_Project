import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
//Actions & methods
import setAuthToken from "./utils/setAuthToken";
import { setUserDispatcher, logoutUserDispatcher } from "./actions/auth";
import { clearCurrentProfile } from "./actions/profileAction";
//Components
import Navbar from "./components/interface/Navbar";
import Landing from "./components/interface/Landing";
import Footer from "./components/interface/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import PrivateRoute from "./components/Dashboard/PrivateRoute";
import AddExperience from "./components/add-experience/AddExperience";
import AddEducation from "./components/add-education/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Feed from "./components/Feed/Feed";
import NotFound from "./components/notFound/NotFound";
import Post from "./components/post/Post";

if (localStorage.getItem("token")) {
  //Setting Auth Token For Axios
  setAuthToken(localStorage.getItem("token"));
  // Get Token
  const { user, exp } = jwt_decode(localStorage.getItem("token"));
  //Dispatching
  store.dispatch(setUserDispatcher(user));
  const now = Date.now() / 1000;
  if (exp < now) {
    //Removing Token From Local Storage
    localStorage.removeItem("token");
    //Removing Autherization Header
    setAuthToken(false);
    // Clear Current Profile
    store.dispatch(clearCurrentProfile());
    //Logout User
    store.dispatch(logoutUserDispatcher());
    //Moving To Login Page
    window.location.href = "/login";
  }
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar />
          <Route path="/" exact component={Landing}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/profiles" component={Profiles}></Route>
          <Route path="/profile/:handle" component={Profile}></Route>
          <Route path="/notFound" component={NotFound}></Route>
          <Switch>
            <PrivateRoute
              path="/dashboard"
              component={Dashboard}
            ></PrivateRoute>
          </Switch>
          <Switch>
            <PrivateRoute
              path="/create-profile"
              component={CreateProfile}
            ></PrivateRoute>
          </Switch>
          <Switch>
            <PrivateRoute
              path="/edit-profile"
              component={EditProfile}
            ></PrivateRoute>
          </Switch>
          <Switch>
            <PrivateRoute
              path="/add-experience"
              component={AddExperience}
            ></PrivateRoute>
          </Switch>
          <Switch>
            <PrivateRoute
              path="/add-education"
              component={AddEducation}
            ></PrivateRoute>
          </Switch>
          <Switch>
            <PrivateRoute path="/feed" component={Feed}></PrivateRoute>
          </Switch>
          <Switch>
            <PrivateRoute path="/post/:id" component={Post}></PrivateRoute>
          </Switch>
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
