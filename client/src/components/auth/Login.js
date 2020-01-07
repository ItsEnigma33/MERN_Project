import React, { Component } from "react";
import axios from "axios";
import classname from "classname";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginAction } from "../../actions/auth";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.loginUser = this.loginUser.bind(this);
    this.input = this.input.bind(this);
  }

  input = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  loginUser = ev => {
    ev.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginAction(user);
  };

  componentWillMount() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      this.props.history.push("./dashboard");
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.auth.isAuthenticated) {
      this.props.history.push("./dashboard");
    } else {
      this.setState({ errors: newProps.error });
    }
  }

  render() {
    return (
      <div>
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">Sign in to your WeTe account</p>
                <form onSubmit={this.loginUser}>
                  <div className="form-group">
                    <input
                      type="email"
                      className={classname("form-control form-control-lg", {
                        "is-invalid": this.state.errors.email
                      })}
                      placeholder="Email Address"
                      name="email"
                      value={this.state.email}
                      onChange={this.input}
                    />

                    {this.state.errors.email && (
                      <div className="invalid-feedback">
                        {this.state.errors.email}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={classname("form-control form-control-lg", {
                        "is-invalid": this.state.errors.password
                      })}
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.input}
                    />
                    {this.state.errors.password && (
                      <div className="invalid-feedback">
                        {this.state.errors.password}
                      </div>
                    )}
                  </div>
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  loginAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { loginAction })(Login);
