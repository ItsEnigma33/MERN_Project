import React, { Component } from "react";
import classname from "classname";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerAction } from "../../actions/registerAction";
import PropTypes from "prop-types";

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

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your WeTe account</p>
              <form onSubmit={this.registerUser}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classname("form-control form-control-lg", {
                      "is-invalid": this.state.errors.name
                    })}
                    placeholder="Name"
                    name="name"
                    onChange={this.input}
                    value={this.state.name}
                  />
                  {this.state.errors.name && (
                    <div className="invalid-feedback">
                      {this.state.errors.name}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classname("form-control form-control-lg", {
                      "is-invalid": this.state.errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    onChange={this.input}
                    value={this.state.email}
                  />
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
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
                    onChange={this.input}
                    value={this.state.password}
                  />
                  {this.state.errors.password && (
                    <div className="invalid-feedback">
                      {this.state.errors.password}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classname("form-control form-control-lg", {
                      "is-invalid": this.state.errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    onChange={this.input}
                    value={this.state.password2}
                  />
                  {this.state.errors.password2 && (
                    <div className="invalid-feedback">
                      {this.state.errors.password2}
                    </div>
                  )}
                </div>
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
