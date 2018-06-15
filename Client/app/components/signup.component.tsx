import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../actions/user.actions';

export class SignUpComponent extends Component<any, any> {
  state = {
    username: '',
    password: '',
    fullname: '',
    email: ''
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const fullname = this.state.fullname;
    const name = fullname.split(' ');

    const user = {
      username: this.state.username,
      password: this.state.password,
      firstname: name[0],
      lastname: name[1],
      email: this.state.email
    };

    axios
      .post('/signUp', { user })
      .then(resp => resp.data)
      .then(user => {
        this.props.startSignUp(user);
      })
      .then(user => this.props.history.push('/login'));
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <body className="text-center">
        <form className="form-signin" onSubmit={this.onSubmitHandler}>
          <h1 className="h3 mb-3 font-weight-normal">ERS</h1>
          <input
            type="text"
            id="inputUsername"
            className="form-control"
            placeholder="username"
            name="username"
            value={this.state.username}
            onChange={this.onChangeHandler}
            required
          />
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.onChangeHandler}
            required
          />
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            name="fullname"
            value={this.state.fullname}
            onChange={this.onChangeHandler}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={this.onChangeHandler}
          />
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>
          <p>
            Do you already have an Account? <Link to="/login">Login</Link>
          </p>
        </form>
      </body>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  startSignUp: userData => dispatch(signUp(userData))
});

export default connect(
  null,
  mapDispatchToProps
)(SignUpComponent);
