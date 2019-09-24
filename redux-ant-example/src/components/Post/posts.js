import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import { fetchPosts, deletePost } from "../../actions/postsAction";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

class Posts extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }
  componentDidMount() {
    this.props.fetchPosts();
  }
  deleteRecord = (id) => {
    this.props.deletePost(id)
      .then(() => {
        this.props.fetchPosts();
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  };
  render() {
    debugger
    const postItems = this.props.propPosts.map(post => (
      <div key={post._id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <Link to={{ pathname: "/edit/" + post._id }}>
          <Button>Edit</Button>
        </Link>&nbsp;
        <Button onClick={this.deleteRecord.bind(this, post._id)}>Delete</Button>
        <hr></hr>
      </div >
    ));

    return (
      <div>
        <Link to='/add'>
          <Button style={{ float: "right" }}>Add Post</Button>
        </Link>
        <h1><b>All Posts</b></h1>
        {postItems}
      </div>
    );
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  //console.log(state);
  return {
    propPosts: state.posts.items
  }
};

export default connect(
  mapStateToProps,
  { fetchPosts, deletePost }
)(Posts);
