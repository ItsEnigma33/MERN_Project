import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerAction } from "../../actions/auth";
import PropTypes from "prop-types";
import InputFiels from "../common/InputField";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.registerUser = this.registerUser.bind(this);
    this.input = this.input.bind(this);
  }

  input = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  registerUser = ev => {
    ev.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerAction(user, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({ errors: nextProps.error });
    }
  }

  componentWillMount() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      this.props.history.push("./dashboard");
    }
  }
  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your WeTe account</p>
              <form onSubmit={this.registerUser}>
                <InputFiels
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.input}
                  error={this.state.errors.name}
                />

                <InputFiels
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  value={this.state.email}
                  onChange={this.input}
                  error={this.state.errors.email}
                  info=" This site uses Gravatar so if you want a profile image, use
                  a Gravatar email"
                />

                <InputFiels
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.input}
                  error={this.state.errors.password}
                />

                <InputFiels
                  name="password2"
                  type="password"
                  placeholder="Confirm Password"
                  value={this.state.password2}
                  onChange={this.input}
                  error={this.state.errors.password2}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  registerAction: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { registerAction })(
  withRouter(Register)
);
