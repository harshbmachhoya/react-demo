import React, { Component } from "react";
import { Form, Input, Button, Radio, Icon, Upload } from "antd";
import { connect } from "react-redux";
import { addPost, getPostById, fetchPosts, updatePost } from "../../actions/postsAction";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class PostsForm extends Component {
  constructor() {
    super();
    this.state = {
      formLayout: "vertical",
      post: null,
      isLoaded: false,
      postData: {},
      isEdit: false
    };

    this.ShowThisFormOnEdit = this.ShowThisFormOnEdit.bind(this);
    this.ShowThisFormOnAdd = this.ShowThisFormOnAdd.bind(this);
  }
  async componentDidMount() {
    // await this.props.fetchPosts();
    const tempObject = this.props.postData;
    console.log(this.props.location.pathname);
    console.log("state", this.state);
    console.log("props", this.props);
    let id = this.props.match.params.id;
    if (!!id) {
      this.props.getPostById(id);
    }
    if (Object.keys(tempObject).length === 0 && tempObject.constructor === Object) {

      this.setState({
        isLoaded: true,
        isEdit: false
      });
    } else {
      this.setState({
        isLoaded: true,
        isEdit: true
      });
    }

  }
  async componentDidUpdate() {
    console.log("Updated");
  }

  // handleFormLayoutChange = e => {
  //   this.setState({ formLayout: e.target.value });
  // };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.match.params.id) {
          this.props.updatePost(this.props.match.params.id, values)
            .then(() => {
              this.props.history.push('/post');
            })
            .catch(err => {
              console.log("ERROR", err);
            });
        } else {
          this.props.addPost(values)
            .then(() => {
              this.props.history.push('/post');
            })
            .catch(err => {
              console.log("ERROR", err);
            });
        }
      }
    });
  };

  ShowThisFormOnEdit = (buttonItemLayout, formItemLayout, post, isedit, getFieldDecorator, formLayout) => {
    const props2 = {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      listType: 'picture',
      defaultFileList: [],
      className: 'upload-list-inline',
    };

    return (
      <div>
        <Form onSubmit={this.handleSubmit} layout={formLayout}>
          <h1>Edit Post</h1>
          <Form.Item label="Title" {...formItemLayout}>
            {getFieldDecorator("title", {
              rules: [{ required: true, message: "Please input your title!" }],
              initialValue: isedit ? post.title : 'H'
            })(
              <Input
                prefix={<Icon type="tag" theme="filled" />}
                placeholder="Title"
              />
            )}
          </Form.Item>
          <Form.Item label="Description" {...formItemLayout}>
            {getFieldDecorator("body", {
              rules: [{ required: true, message: "Please input description!" }],
              initialValue: isedit ? post.body : 'H'
            })(
              <Input
                prefix={<Icon type="database" theme="filled" />}
                placeholder="Description"
              />
            )}
          </Form.Item>
          <Form.Item label="Upload" extra="h">
            {getFieldDecorator('upload', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(

              <Upload {...props2}>
                <Button>
                  <Icon type="upload" /> Upload
            </Button>
              </Upload>


              // <Upload name="logo" action="/upload.do" listType="picture">
              //   <Button>
              //     <Icon type="upload" /> Click to upload
              // </Button>
              // </Upload>,
            )}
          </Form.Item>

          <Form.Item {...buttonItemLayout}>
            {/* <Link to="/"> */}
            <Button type="primary" htmlType="submit">
              Submit
            </Button>&nbsp;
            <Button htmlType="button" onClick={() => { this.props.history.goBack() }}>
              Back
            </Button>
            {/* </Link> */}
          </Form.Item>
        </Form>
      </div>
    );
  }
  ShowThisFormOnAdd = (buttonItemLayout, formItemLayout, post, isedit, getFieldDecorator, formLayout) => {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} layout={formLayout}>
          <h1>Add Post</h1>
          <Form.Item label="Title" {...formItemLayout}>
            {getFieldDecorator("title", {
              rules: [{ required: true, message: "Please input your title!" }],
            })(
              <Input
                prefix={<Icon type="tag" theme="filled" />}
                placeholder="Title"
              />
            )}
          </Form.Item>
          <Form.Item label="Description" {...formItemLayout}>
            {getFieldDecorator("body", {
              rules: [{ required: true, message: "Please input description!" }],
            })(
              <Input
                prefix={<Icon type="database" theme="filled" />}
                placeholder="Description"
              />
            )}
          </Form.Item>
          <Form.Item label="Upload" extra="">
            {getFieldDecorator('upload', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button>
                  <Icon type="upload" /> Click to upload
              </Button>
              </Upload>,
            )}
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            {/* <Link to="/"> */}
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            {/* </Link> */}
          </Form.Item>


        </Form>
      </div>
    );
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { formLayout, isLoading } = this.state;
    const post = this.props.postData;
    const isedit = this.props.isEdit;
    if (!this.state.isLoaded) {
      return <div>Loading...</div>
    }
    else {
      const formItemLayout =
        formLayout === "vertical"
          ? {
            labelCol: { span: 2 },
            wrapperCol: { span: 10 }
          }
          : null;
      const buttonItemLayout =
        formLayout === "horizontal"
          ? {
            wrapperCol: { span: 14, offset: 4 }
          }
          : null;

      if (this.props.location.pathname === "/add") {
        console.log("add");
        return this.ShowThisFormOnAdd(buttonItemLayout, formItemLayout, post, isedit, getFieldDecorator, formLayout)
      } else {
        console.log("edit");
        return this.ShowThisFormOnEdit(buttonItemLayout, formItemLayout, post, isedit, getFieldDecorator, formLayout)
      }

    }

  }
}
const WrappedPostsForm = Form.create({ name: "normal_login" })(PostsForm);

PostsForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  getPostById: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  // console.log(state);
  return {
    postData: state.posts.item,
    isLoaded: state.posts.isLoaded,
    isEdit: state.posts.isEdit
  }
};

export default connect(
  mapStateToProps,
  { addPost, getPostById, fetchPosts, updatePost }
)(WrappedPostsForm);
// ReactDOM.render(<PostsForm />, mountNode);