import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

class ProfileCred extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          <ul className="list-group">
            {profile.experience.map(exp => (
              <li className="list-group-item" key={exp._id}>
                <h4>{exp.company}</h4>
                <p>
                  <Moment format="DD-MM-YYYY" date={exp.from} /> {" - "}
                  {exp.current ? (
                    "Current"
                  ) : (
                    <Moment format="DD-MM-YYYY" date={exp.to} />
                  )}
                </p>
                <p>
                  <strong>Position:</strong> {exp.title}
                </p>
                {exp.discription ? (
                  <p>
                    <strong>Description:</strong> {exp.description}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          <ul className="list-group">
            {profile.education.map(edu => (
              <li className="list-group-item" key={edu._id}>
                <h4>{edu.fieldOfDegree}</h4>
                <p>
                  <strong>School: </strong>
                  {edu.school}
                </p>
                {edu.highschool ? (
                  <p>
                    <strong>HighSchool: </strong>
                    {edu.highschool}
                  </p>
                ) : null}
                {edu.college ? (
                  <p>
                    <strong>College: </strong>
                    {edu.college}
                  </p>
                ) : null}
                {edu.description ? (
                  <p>
                    <strong>Description: </strong>
                    {edu.description}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

ProfileCred.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileCred;
