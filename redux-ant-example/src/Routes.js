import React, { lazy, Suspense, Component } from "react";
import { Switch, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Posts from "./components/Post/posts";
import PostsForm from "./components/Post/postForm";
import Home from "./components/Home";
import renderEmpty from "antd/lib/config-provider/renderEmpty";
export default class Routes extends Component {

    // class Routes = ({ authState }) => {
    debugger

    // if (authState !== "signedIn") {
    //     return null;
    // }
    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    render() {
        console.log(this.props);

        if (!this.props.isAuthed) {
            return null;
        }
        return (
            < main >
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <MainLayout>
                            {/* <Route path={"/post"} exact component={Posts} /> */}
                            {/* <PrivateRoute exact path="/post" component={Posts} authed={this.props.currentUser} />  */}
                            <Route path={"/"} exact component={Home} />
                            <Route path={"/post"} exact component={Posts} />
                            <Route path={"/add"} exact component={PostsForm} />
                            <Route path={"/edit/:id"} exact component={PostsForm} />
                        </MainLayout>
                    </Switch>
                </Suspense>
            </main >
        );
    }
}

// export default Routes;

