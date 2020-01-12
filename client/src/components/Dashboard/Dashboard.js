import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profileAction";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

class Dashboard extends Component {
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
        dashboardRender = <h2 className="display-2">TODO: Display Profile</h2>;
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
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
