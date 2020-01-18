import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { deleteEducationById } from "../../actions/profileAction";

class Education extends Component {
  deleteEducation(id, ev) {
    ev.preventDefault();
    this.props.deleteEducationById(id, this.props.history);
  }

  render() {
    const educations = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.highschool}</td>
        <td>{edu.college}</td>
        <td>{edu.fieldOfDegree}</td>
        <td className="text-right">
          <button
            className="btn btn-danger"
            onClick={this.deleteEducation.bind(this, edu._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-2">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>High School</th>
              <th>College</th>
              <th>Field Of Degree</th>
              <th />
            </tr>
          </thead>
          <tbody>{educations}</tbody>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducationById: PropTypes.func.isRequired
};

export default connect(null, { deleteEducationById })(withRouter(Education));
