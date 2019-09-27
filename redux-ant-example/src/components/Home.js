import React, { Component } from "react";
import { Button } from "antd";
import { Link, withRouter, Redirect } from 'react-router-dom';

export default class Home extends Component {
    goToLogin() {
        localStorage.removeItem('jwtToken');
        this.props.history.push('/login')
    }
    render() {
        return (
            <div className="home">
                <h1>Login required</h1>
                <Button onClick={this.goToLogin.bind(this)}>Go to Login</Button>
            </div>
        )
    }
}
{/* <Link to="/post" /> */ }