import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import { logout } from "../../actions/auth";
import { clearCurrentProfile } from "../../actions/profileAction";

class Navbar extends Component {
  logOut(ev) {
    ev.preventDefault();
    //Clear Profile Action
    this.props.clearCurrentProfile();
    //Logout Action
    this.props.logout();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const loggedUser = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a href="#" onClick={this.logOut.bind(this)} className="nav-link">
            <img
              src={user.avatar}
              className="rounded-circle "
              style={{ width: "25px", marginRight: "5px" }}
              alt={user.name}
            />{" "}
            Logout
          </a>
        </li>
      </ul>
    );

    const guestUser = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">
              WeTe
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/profiles">
                    Team
                  </Link>
                </li>
              </ul>

              {isAuthenticated ? loggedUser : guestUser}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  auth: Proptypes.object.isRequired,
  clearCurrentProfile: Proptypes.func.isRequired,
  logout: Proptypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout, clearCurrentProfile })(
  Navbar
);
