import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export default class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img
              className="rounded-circle"
              src={profile.user.avatar}
              alt={profile.handle}
            />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            <p>
              {profile.status}{" "}
              {profile.company ? <span>at {profile.company}</span> : null}
            </p>
            {profile.location ? <p>{profile.location}</p> : null}
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-lg-block">
            <h4>Skill Set</h4>
            <ul className="list-group">
              {profile.skills.slice(0, 4).map(skill => (
                <li className="list-group-item" key={Math.random()}>
                  <i className="fa fa-check pr-1"></i>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
