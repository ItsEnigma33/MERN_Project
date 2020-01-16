import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import InputGroupField from "../common/InputField";
import TextAreaField from "../common/TextAreaField";
import { addEducationAction } from "../../actions/profileAction";

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      highSchool: "",
      college: "",
      fieldOfDegree: "",
      description: "",
      errors: {}
    };

    this.changeEvent = this.changeEvent.bind(this);
    this.addNewEducation = this.addNewEducation.bind(this);
  }

  changeEvent(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  addNewEducation(ev) {
    ev.preventDefault();
    const newEduData = {
      school: this.state.school,
      highSchool: this.state.highSchool,
      college: this.state.college,
      fieldOfDegree: this.state.fieldOfDegree,
      description: this.state.description
    };

    this.props.addEducationAction(newEduData, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) this.setState({ errors: nextProps.error });
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
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* required field</small>
              <form onSubmit={this.addNewEducation}>
                <InputGroupField
                  name="school"
                  type="text"
                  value={this.state.school}
                  onChange={this.changeEvent}
                  placeholder="* School"
                  error={error.school}
                />

                <InputGroupField
                  name="highSchool"
                  type="text"
                  value={this.state.highSchool}
                  onChange={this.changeEvent}
                  placeholder="HighSchool"
                  error={error.highSchool}
                />

                <InputGroupField
                  name="college"
                  type="text"
                  value={this.state.college}
                  onChange={this.changeEvent}
                  placeholder="College"
                  error={error.college}
                />

                <InputGroupField
                  name="fieldOfDegree"
                  type="text"
                  value={this.state.fieldOfDegree}
                  onChange={this.changeEvent}
                  placeholder="* Field Of Degree"
                  error={error.fieldOfDegree}
                />

                <TextAreaField
                  placeholder="Program Description"
                  name="description"
                  info="Tell us about your experience and what you learned"
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

AddEducation.propTypes = {
  error: PropTypes.object.isRequired,
  addEducationAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.error
});

export default connect(mapStateToProps, { addEducationAction })(
  withRouter(AddEducation)
);
