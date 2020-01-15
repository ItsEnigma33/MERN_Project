import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import InputGroupField from "../common/InputField";
import TextAreaField from "../common/TextAreaField";
import SelectListField from "../common/SelectListField";
import IconInputField from "../common/IconInputField";
import { createProfile, getCurrentProfile } from "../../actions/profileAction";
import isEmptyCheck from "../../utils/validator/isEmptyCheck";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      status: "",
      company: "",
      website: "",
      location: "",
      skills: "",
      githubusername: "",
      bio: "",
      optionalSocialLinks: false,
      twitter: "",
      facebook: "",
      linkedIn: "",
      youtube: "",
      instagram: "",
      errors: {}
    };

    this.userInput = this.userInput.bind(this);
    this.submitProfile = this.submitProfile.bind(this);
  }

  userInput(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({ errors: nextProps.error });
    }
    if (nextProps.profile.profile) {
      const { profile } = nextProps.profile;

      //Checking For Empty Or undefined
      profile.handle = isEmptyCheck(profile.handle) ? "" : profile.handle;
      profile.status = isEmptyCheck(profile.status) ? "" : profile.status;
      profile.company = isEmptyCheck(profile.company) ? "" : profile.company;
      profile.website = isEmptyCheck(profile.website) ? "" : profile.website;
      profile.location = isEmptyCheck(profile.location) ? "" : profile.location;
      profile.githubusername = isEmptyCheck(profile.githubusername)
        ? ""
        : profile.githubusername;

      // profile Section
      profile.social = isEmptyCheck(profile.social) ? {} : profile.social;
      profile.social.twitter = isEmptyCheck(profile.social.twitter)
        ? ""
        : profile.social.twitter;
      profile.social.facebook = isEmptyCheck(profile.social.facebook)
        ? ""
        : profile.social.facebook;
      profile.social.linkedIn = isEmptyCheck(profile.social.linkedIn)
        ? ""
        : profile.social.linkedIn;
      profile.social.youtube = isEmptyCheck(profile.social.youtube)
        ? ""
        : profile.social.youtube;
      profile.social.instagram = isEmptyCheck(profile.social.instagram)
        ? ""
        : profile.social.instagram;

      //getting Array of Skills
      profile.skills = isEmptyCheck(profile.skills)
        ? ""
        : profile.skills.join(",");

      //Setting in the State
      this.setState({
        handle: profile.handle,
        status: profile.status,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        skills: profile.skills,
        githubusername: profile.githubusername,
        bio: profile.bio,
        optionalSocialLinks: !isEmptyCheck(profile.social),
        twitter: profile.social.twitter,
        facebook: profile.social.facebook,
        linkedIn: profile.social.linkedIn,
        youtube: profile.social.youtube,
        instagram: profile.social.instagram
      });
    }
  }

  submitProfile(ev) {
    ev.preventDefault();
    const profileData = {
      handle: this.state.handle,
      status: this.state.status,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedIn: this.state.linkedIn,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    this.props.createProfile(profileData, this.props.history);
  }

  render() {
    const error = this.state.errors;

    let socialLinks;

    if (this.state.optionalSocialLinks) {
      socialLinks = (
        <div>
          <IconInputField
            name="twitter"
            placeholder="Twitter Profile URL"
            type="text"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.userInput}
            error={error.twitter}
          />

          <IconInputField
            name="facebook"
            placeholder="Facebook Page URL"
            type="text"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.userInput}
            error={error.facebook}
          />

          <IconInputField
            name="linkedIn"
            placeholder="Linkedin Profile URL"
            type="text"
            icon="fab fa-linkedin"
            value={this.state.linkedIn}
            onChange={this.userInput}
            error={error.linkedIn}
          />

          <IconInputField
            name="youtube"
            placeholder="YouTube Channel URL"
            type="text"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.userInput}
            error={error.youtube}
          />

          <IconInputField
            name="instagram"
            placeholder="Instagram Page URL"
            type="text"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.userInput}
            error={error.instagram}
          />
        </div>
      );
    }

    //Options For Status
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* Required Fields</small>
              <form onSubmit={this.submitProfile}>
                <InputGroupField
                  name="handle"
                  type="text"
                  value={this.state.handle}
                  onChange={this.userInput}
                  placeholder="* Profile handle"
                  info="A unique handle for your profile URL. Your full name,
                    company name, nickname, etc (This CAN'T be changed later)"
                  error={error.handle}
                />

                <SelectListField
                  name="status"
                  onChange={this.userInput}
                  options={options}
                  value={this.state.status}
                  info="Give us an idea of where you are at in your career"
                  error={error.status}
                />

                <InputGroupField
                  name="company"
                  type="text"
                  value={this.state.company}
                  onChange={this.userInput}
                  placeholder="Company"
                  info="Could be your own company or one you work for"
                  error={error.company}
                />

                <InputGroupField
                  name="website"
                  type="text"
                  value={this.state.website}
                  onChange={this.userInput}
                  placeholder="Website"
                  info="Could be your own or a company website"
                  error={error.website}
                />

                <InputGroupField
                  name="location"
                  type="text"
                  value={this.state.location}
                  onChange={this.userInput}
                  placeholder="Location"
                  info="City & state suggested (eg. Boston, MA)"
                  error={error.location}
                />

                <InputGroupField
                  name="skills"
                  type="text"
                  value={this.state.skills}
                  onChange={this.userInput}
                  placeholder="Skills"
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)"
                  error={error.skills}
                />

                <InputGroupField
                  name="githubusername"
                  type="text"
                  value={this.state.githubusername}
                  onChange={this.userInput}
                  placeholder="Github Username"
                  info="If you want your latest repos and a Github link, include
                  your username"
                  error={error.githubusername}
                />

                <TextAreaField
                  name="bio"
                  value={this.state.bio}
                  onChange={this.userInput}
                  placeholder="A short bio of yourself"
                  info="Tell us a little about yourself"
                  error={error.bio}
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prev => ({
                        optionalSocialLinks: !prev.optionalSocialLinks
                      }));
                    }}
                    className="btn btn-info"
                  >
                    Add Social Network Links
                  </button>
                </div>

                {socialLinks}

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
