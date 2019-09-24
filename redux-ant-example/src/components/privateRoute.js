import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import MainLayout from "../components/MainLayout";
import Post from "../components/Post/posts";

const PrivateRoute = ({ component: Component, authed, path, ...rest }) => {
    debugger
    console.log("PrivateRoute", path);
    return (
        <Route
            {...rest}
            render={props => (
                authed
                    ? <MainLayout><Component {...props} /></MainLayout>
                    //? <MainLayout></MainLayout>
                    : <Redirect to="/" />
            )
            }
        />)
};

export default PrivateRoute;