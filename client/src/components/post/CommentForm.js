import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createComment } from "../../actions/postAction";
import TextAreaField from "../common/TextAreaField";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };

    this.changeEvent = this.changeEvent.bind(this);
    this.submitPost = this.submitPost.bind(this);
  }

  changeEvent(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  submitPost(ev) {
    ev.preventDefault();
    const { user } = this.props.auth;
    const { postId } = this.props;
    const comment = {
      text: this.state.text,
      userId: user.id,
      name: user.name,
      avatar: user.avatar
    };
    this.props.createComment(postId, comment);
    this.setState({ text: "" });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({ error: nextProps.error });
    }
  }

  render() {
    const error = this.state.errors;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Comment To Post..
          </div>
          <div className="card-body">
            <form onSubmit={this.submitPost}>
              <div className="form-group">
                <TextAreaField
                  placeholder="Post"
                  name="text"
                  value={this.state.text}
                  onChange={this.changeEvent}
                  error={error.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  createComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { createComment })(CommentForm);
