import React from "react";
import "./App.css";
import Navbar from "./components/interface/Navbar";
import Landing from "./components/interface/Landing";
import Footer from "./components/interface/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar />
          <Route path="/" exact component={Landing}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
