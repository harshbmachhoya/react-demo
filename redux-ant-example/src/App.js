import React, { Component, Suspense } from "react";
import "./App.css";
import { Provider } from "react-redux";
import Post from "./components/Post/posts";
import PostsForm from "./components/Post/postForm";
import store from "./store/store";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import MainLayout from "./components/MainLayout";
import Home from "./components/Home";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import PrivateRoute from "./components/privateRoute";
import Routes from './Routes';

class App extends Component {
  state = {
    isAuthenticated: false
  }
  // handleOpenMainlayout = (data) => {
  //   this.setState({ openmain: data })
  // }
  componentDidMount() {
    this.setState({ isAuthenticated: localStorage.getItem('jwtToken') ? true : false });
  }
  render() {
    console.log("From app", this.props);
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route path={"/"} exact component={Home} />
            <Route path={"/login"} exact component={Login} />
            <Route path={"/register"} exact component={Register} />
            {/* {console.log(store)} */}
            {/* {isAuthenticated} */}
            {/* {this.state.isAuthenticated
              ? */}
            <MainLayout path={"/main"} exact>
              {/* <Route path={"/main"} exact component={Home} /> */}
              <Route path={"/post"} component={Post} />
              <Route path={"/add"} exact component={PostsForm} />
              <Route path={"/edit/:id"} exact component={PostsForm} />
            </MainLayout>
            {/* :
              <Redirect to="/"></Redirect>} */}
            {/* <PrivateRoute exact path="/protected" component={Post} auth={false} /> */}

          </div>
        </Router>
      </Provider >
    );
  }

  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  }
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }

}


export default App;
