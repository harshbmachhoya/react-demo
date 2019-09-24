import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from "react-redux";
import { loginUser } from "../../actions/authentication";
import PropTypes from "prop-types";
import PrivateRoute from "../privateRoute";
import Post from "../Post/posts";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


class Login extends Component {

    state = {
        isAuth: false
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                debugger
                this.props.loginUser(values)
                    .then((res) => {
                        //this.props.history.push('/protected');
                        //this.state.isAuth = this.state.isAuth ? <PrivateRoute component="Post" authed={this.state.isAuth} /> : this.props.history.push('/login');
                    })
                    .catch(err => {
                        console.log("ERROR", err);
                    });
            }
        });
    };
    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps.auth);
    //     this.setState({ isAuth: nextProps.auth.isAuthenticated });
    // }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/main')
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/main');
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { auth } = this.props;
        debugger
        return (
            <div>
                {this.props.auth.isAuthenticated || localStorage.getItem('jwtToken') ? (
                    this.props.history.push('/main')
                    // <Redirect to={{
                    //     pathname: '/post',
                    //     state: { auth: this.state.isAuth }
                    // }}
                    ///>

                    // <PrivateRoute component={Post} path={"/post"} authed={this.state.isAuth} />
                ) :
                    (
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('email', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(<Checkbox>Remember me</Checkbox>)}
                                <a className="login-form-forgot" href="">
                                    Forgot password
              </a>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
              </Button>
                                Or <a href="/register">register now!</a>
                            </Form.Item>
                        </Form>
                    )
                }

            </div>
        );
    }
}


const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    // console.log(state);
    debugger
    return {
        jwttoken: state.posts.jwttoken,
        isLoaded: state.posts.isLoaded,
        auth: state.auth
    }
};
export default connect(
    mapStateToProps,
    { loginUser }
)(WrappedNormalLoginForm);