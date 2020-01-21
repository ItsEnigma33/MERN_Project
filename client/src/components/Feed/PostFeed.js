import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostItem from "./PostItem";

class PostFeed extends Component {
  render() {
    let postsRenderer;
    const { posts } = this.props;
    if (posts.length !== 0) {
      postsRenderer = posts.map(post => (
        <PostItem post={post} key={post._id} action={true} />
      ));
    } else {
      postsRenderer = <h4>No Post Yet!</h4>;
    }

    return <div>{postsRenderer}</div>;
  }
}

export default connect(null)(PostFeed);
