import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
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

if (localStorage.getItem("token")) {
  //Setting Auth Token For Axios
  setAuthToken(localStorage.getItem("token"));
  // Get Token
  const { user, min } = jwt_decode(localStorage.getItem("token"));
  //Dispatching
  store.dispatch(setUserDispatcher(user));
  const now = Date.now() / 1000;
  if (min < now) {
    //Removing Token From Local Storage
    localStorage.removeItem("token");
    //Removing Autherization Header
    setAuthToken(false);
    // Clear Current Profile
    store.dispatch(clearCurrentProfile());
    //Logout User
    store.dispatch(logoutUserDispatcher());
    //Moving To Login Page
    window.location.href = "/user/login";
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
          <Route path="/dashboard" component={Dashboard}></Route>
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
