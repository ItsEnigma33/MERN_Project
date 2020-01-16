import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import InputGroupField from "../common/InputField";
import TextAreaField from "../common/TextAreaField";
import { addExperienceAction } from "../../actions/profileAction";

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      company: "",
      location: "",
      from: "",
      to: "",
      currentWorking: false,
      description: "",
      errors: {}
    };

    this.changeEvent = this.changeEvent.bind(this);
    this.addNewExperience = this.addNewExperience.bind(this);
    this.changeCurrent = this.changeCurrent.bind(this);
  }

  changeEvent(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  changeCurrent(ev) {
    this.setState({ currentWorking: !this.state.currentWorking });
  }

  addNewExperience(ev) {
    ev.preventDefault();
    const experienceObject = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      currentWorking: this.state.currentWorking,
      description: this.state.description
    };
    this.props.addExperienceAction(experienceObject, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({ errors: nextProps.error });
    }
  }

  render() {
    const error = this.state.errors;

    return (
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the
                past
              </p>
              <small className="d-block pb-3">* required field</small>
              <form onSubmit={this.addNewExperience}>
                <InputGroupField
                  name="title"
                  type="text"
                  value={this.state.title}
                  onChange={this.changeEvent}
                  placeholder="* Job Title"
                  error={error.title}
                />

                <InputGroupField
                  name="company"
                  type="text"
                  value={this.state.company}
                  onChange={this.changeEvent}
                  placeholder="* Company"
                  error={error.company}
                />

                <InputGroupField
                  name="location"
                  type="text"
                  value={this.state.location}
                  onChange={this.changeEvent}
                  placeholder="Location"
                  error={error.location}
                />

                <h6>From Date</h6>
                <InputGroupField
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.changeEvent}
                  error={error.from}
                />

                <h6>To Date</h6>
                <InputGroupField
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.changeEvent}
                  error={error.to}
                  disabled={this.state.currentWorking}
                />

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="currentWorking"
                    value={this.state.currentWorking}
                    checked={this.state.currentWorking}
                    onChange={this.changeCurrent}
                    id="currentWorking"
                  />
                  <label className="form-check-label" htmlFor="currentWorking">
                    Current Job
                  </label>
                </div>

                <TextAreaField
                  placeholder="Job Description"
                  name="description"
                  info="Some of your responsabilities, etc"
                  value={this.state.description}
                  onChange={this.changeEvent}
                  error={error.description}
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

AddExperience.propTypes = {
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  addExperienceAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { addExperienceAction })(
  withRouter(AddExperience)
);
