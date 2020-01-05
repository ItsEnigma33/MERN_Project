import React, { Component } from "react";
import axios from "axios";
import classname from "classname";

export default class Login extends Component {
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

    axios
      .post("/user/login", user)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({
          errors: err.response.data
        });
      });
  };

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
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={classname("form-control form-control-lg", {
                        "is-invalid": this.state.errors.password
                      })}
                      placeholder="Password"
                      name="password"
                    />
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
