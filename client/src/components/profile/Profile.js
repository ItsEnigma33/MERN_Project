import React, { Component } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileCred from "./ProfileCred";
import ProfileAbout from "./ProfileAbout";
import ProfileGitHub from "./ProfileGitHub";
import { connect } from "react-redux";
import { getProfileByHandle } from "../../actions/profileAction";
import Spinner from "../Dashboard/Spinner";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileRenderer;
    if (profile == null || loading) {
      profileRenderer = <Spinner />;
    } else {
      profileRenderer = (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-6">
                  <Link
                    to="/profiles"
                    className="btn btn-light mb-3 float-left"
                  >
                    Back To Profiles
                  </Link>
                </div>
                <div className="col-6"></div>
              </div>
              <ProfileHeader profile={profile} />
              <ProfileAbout profile={profile} />
              <ProfileCred profile={profile} />
              {profile.githubusername ? (
                <ProfileGitHub username={profile.githubusername} />
              ) : null}
            </div>
          </div>
        </div>
      );
    }

    return <div className="profile">{profileRenderer}</div>;
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
