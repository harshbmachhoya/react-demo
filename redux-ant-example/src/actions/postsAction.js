import { FETCH_POSTS, ADD_POST, FETCH_POST_BY_ID, UPDATE_POST } from "../actions/types";

export const fetchPosts = () => dispatch => {
  // return fetch("http://localhost:3333/posts")
  return fetch("http://localhost:5001/blogs")
    .then(res => res.json())
    .then(posts =>
      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    );
};

export const addPost = postData => dispatch => {
  console.log("Add action called");
  // return fetch("http://localhost:3333/posts", {
  return fetch("http://localhost:5001/blogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  })
    .then(res => { return res.json() })
    .then(newPost => {
      dispatch({
        type: ADD_POST,
        payload: newPost
      })
    });
};

export const getPostById = (id) => dispatch => {
  console.log(id);
  return fetch("http://localhost:5001/blogs/" + id)
    .then(res => { return res.json() })
    .then(post => {
      dispatch({
        type: FETCH_POST_BY_ID,
        payload: post
      })
    });
};
export const updatePost = (id, upateData) => dispatch => {
  console.log(id, upateData);
  return fetch("http://localhost:5001/blogs/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(upateData)
  })
    .then(res => { return res.json() })
    .then(post => {
      dispatch({
        type: UPDATE_POST,
        payload: post
      })
    });
};
export const deletePost = (id) => dispatch => {
  // console.log(id);
  debugger
  return fetch("http://localhost:5001/blogs/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => { return res.json() })
  // .then(post => {
  //   debugger
  //   dispatch({
  //     type: FETCH_POSTS,
  //     payload: post
  //   })
  // });
};