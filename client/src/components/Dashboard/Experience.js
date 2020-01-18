import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperienceById } from "../../actions/profileAction";

class Experience extends Component {
  deleteExperience(id, ev) {
    ev.preventDefault();
    this.props.deleteExperienceById(id, this.props.history);
  }

  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="DD-MM-YYYY" date={exp.from} /> -{" "}
          <Moment format="DD-MM-YYYY" date={exp.to} />
        </td>
        <td className="text-right">
          <button
            className="btn btn-danger"
            onClick={this.deleteExperience.bind(this, exp._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-2">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperienceById: PropTypes.func.isRequired
};

export default connect(null, { deleteExperienceById })(withRouter(Experience));
