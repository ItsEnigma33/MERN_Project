import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile, deleteProfile } from "../../actions/profileAction";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import DashboardMenu from "./DashboardMenu";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.deleteAccountHandler = this.deleteAccountHandler.bind(this);
  }

  deleteAccountHandler(ev) {
    ev.preventDefault();
    this.props.deleteProfile();
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { loading, profile } = this.props.profile;

    let dashboardRender;

    if (profile === null || loading) {
      dashboardRender = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        // Contains Profile Data
        dashboardRender = (
          <div>
            <p className="lead-text-muted">
              Welome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>

            <DashboardMenu />

            <Experience experience={profile.experience} />

            <Education education={profile.education} />

            <div style={{ marginBottom: "60px" }}>
              <button
                className="btn btn-danger"
                onClick={this.deleteAccountHandler}
              >
                Delete My Account
              </button>
            </div>
          </div>
        );
      } else {
        //No Profile Yet
        dashboardRender = (
          <div>
            <p className="lead-text-muted">Welome {user.name},</p>
            <p>You have Not Created A Profile,Please Add Profile Info</p>
            <Link to="create-Profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardRender}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteProfile })(
  Dashboard
);
