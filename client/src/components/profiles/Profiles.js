import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllProfiles } from "../../actions/profileAction";
import Spinner from "../Dashboard/Spinner";
import PropTypes from "prop-types";
import ProfileItem from "./ProfileItem";

class Profiles extends Component {
  componentDidMount() {
    //Fetch All Profiles
    this.props.getAllProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileRenderer;
    if (loading || profiles == null) {
      profileRenderer = <Spinner />;
    } else {
      if (Array.isArray(profiles) && profiles.length !== 0) {
        profileRenderer = profiles.map(profile => (
          <ProfileItem profile={profile} key={profile._id} />
        ));
      } else {
        profileRenderer = <h3>No Profile Found</h3>;
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {profileRenderer}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getAllProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
