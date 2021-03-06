import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deletePost, likePost, unlikePost } from "../../actions/postAction";
import classnames from "classnames";

class PostItem extends Component {
  deletePost(id, ev) {
    ev.preventDefault();
    this.props.deletePost(id);
  }

  likePost(id, ev) {
    ev.preventDefault();
    this.props.likePost(id);
  }

  unlikePost(id, ev) {
    ev.preventDefault();
    this.props.unlikePost(id);
  }

  checkForLike(likeArray) {
    return (
      likeArray.filter(like => like.user === this.props.auth.id).length > 0
    );
  }

  render() {
    const { post, auth, action } = this.props;
    let actionButtons;
    if (action) {
      actionButtons = (
        <span>
          <button
            type="button"
            className="btn btn-light mr-1"
            onClick={this.likePost.bind(this, post._id)}
          >
            <i
              className="text-info fas fa-thumbs-up"
              classnames={
                ("fas fa-thumbs-up",
                {
                  "text-info": this.checkForLike.bind(this, post.likes)
                })
              }
            ></i>
            <span className="badge badge-light">{post.likes.length}</span>
          </button>
          <button
            type="button"
            className="btn btn-light mr-1"
            onClick={this.unlikePost.bind(this, post._id)}
          >
            <i className="text-secondary fas fa-thumbs-down"></i>
          </button>
          <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
            Comments
          </Link>
          {post.user === auth.user.id ? (
            <button
              type="button"
              onClick={this.deletePost.bind(this, post._id)}
              className="btn btn-danger mr-1"
            >
              <i className="fas fa-trash" />
            </button>
          ) : null}
        </span>
      );
    } else {
      actionButtons = null;
    }

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to="/profile">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </Link>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {actionButtons}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost, likePost, unlikePost })(
  PostItem
);
