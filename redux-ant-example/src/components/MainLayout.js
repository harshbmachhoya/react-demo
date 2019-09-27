import React, { Component } from "react";
import {
    Layout, Menu, Icon
} from 'antd';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from '../actions/authentication';
import Post from './Post/posts';
import PrivateRoute from './privateRoute'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class MainLayout extends Component {
    constructor() {
        super();
        this.state = {
            formLayout: "vertical",
            authenticate: ''
        };
    }
    // componentWillMount() {
    //     if (this.props.auth.isAuthenticated) {
    //         this.props.history.push('/login');
    //     }
    //     // this.setState({ authenticate: localStorage.removeItem('jwtToken') });
    // }
    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }
    desktopMenu = () => {
        return (
            <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
            >
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="/main">
                            <Icon type="home" />
                            <span>Home</span>
                            <Link to="/main" />
                        </Menu.Item>
                        <SubMenu key="sub1" title={<span>  <Icon type="book" />Post</span>}>
                            <Menu.Item key="/post"> <Icon type="appstore" />
                                <span>All Post</span>
                                <Link to="/post" /></Menu.Item>

                            <Menu.Item key="/add"><Icon type="plus" />
                                <span>Add Post</span>
                                <Link to="/add" /></Menu.Item>

                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                            <Menu.Item key="5">option5</Menu.Item>
                            <Menu.Item key="6">option6</Menu.Item>
                            <Menu.Item key="7">option7</Menu.Item>
                            <Menu.Item key="8">option8</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                            <Menu.Item key="9">option9</Menu.Item>
                            <Menu.Item key="10">option10</Menu.Item>
                            <Menu.Item key="11">option11</Menu.Item>
                            <Menu.Item key="12">option12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
            </Sider>
        );
    };

    render() {

        const { isAuthenticated, user } = this.props.auth;
        const { children } = this.props;
        debugger
        return (
            <div>
                {this.props.auth.isAuthenticated || localStorage.getItem('jwtToken') ? (
                    <Layout style={{ minHeight: "100vh" }}>
                        <Header className="header">
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={['2']}
                                style={{ lineHeight: '64px' }}
                            >
                                <Menu.Item key="1">nav 1</Menu.Item>
                                <Menu.Item key="2">nav 2</Menu.Item>
                                <Menu.Item key="3">nav 3</Menu.Item>
                                <Menu.Item key="4" style={{ float: 'right' }}><a href="#" className="nav-link" onClick={this.onLogout.bind(this)}>
                                    Logout
                </a>
                                </Menu.Item>
                            </Menu>
                        </Header>
                        <Layout>
                            {/* <Layout style={{ padding: '0 24px 24px' }}> */}
                            {this.desktopMenu()}
                            <Content style={{
                                background: '#fff', padding: 20, margin: 20, minHeight: 280, maxHeight: 833,
                            }}
                            >
                                {children}
                            </Content>
                            {/* </Layout> */}
                        </Layout>
                    </Layout>
                ) :
                    //this.props.history.push('/')
                    <Redirect to="/login" />
                    // null
                }

            </div>
        );
    }
}
MainLayout.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(MainLayout));