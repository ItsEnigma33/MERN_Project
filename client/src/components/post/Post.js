import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPostById } from "../../actions/postAction";
import Spinner from "../Dashboard/Spinner";
import PostItem from "../Feed/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

class Post extends Component {
  componentDidMount() {
    if (this.props.match.params.id)
      this.props.getPostById(this.props.match.params.id);
  }

  render() {
    let postRenderer;
    const { post, loading } = this.props.post;
    if (loading || post === null || Object.keys(post).length === 0) {
      postRenderer = <Spinner />;
    } else {
      postRenderer = (
        <div className="col-md-12">
          <PostItem post={post} action={false} />
          <CommentForm postId={post._id} />
          {post.comment.map(com => (
            <CommentItem key={com._id} postId={post._id} comment={com} />
          ))}
        </div>
      );
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">{postRenderer}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPostById })(Post);
