import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Spinner from "../Dashboard/Spinner";
import { getAllPost } from "../../actions/postAction";

class Feed extends Component {
  componentDidMount() {
    this.props.getAllPost();
  }

  render() {
    let postRenderer;
    const { posts, loading } = this.props.post;
    if (loading || posts == null) {
      postRenderer = <Spinner />;
    } else {
      postRenderer = <PostFeed posts={posts} />;
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postRenderer}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getAllPost })(Feed);
