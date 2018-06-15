import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { login } from '../actions/user.actions';
import { connect } from 'react-redux';

export class LoginComponent extends Component<any, any> {
  state = {
    username: '',
    password: ''
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };

    axios
      .post('/login', { user })
      .then(resp => resp.data)
      .then(user => {
        console.log('just before dispatch', user);
        this.props.startLogin(user);
      })
      .then(user => this.props.history.push('/dashboard'))
      .catch(err => {
        console.log('something went wwrong on the server');
      });
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
          <label htmlFor="inputEmail" className="sr-only">
            Username:
          </label>
          <input
            type="text"
            id="inputEmail"
            className="form-control"
            placeholder="Username"
            name="username"
            value={this.state.username}
            onChange={this.onChangeHandler}
            required
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
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
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>
          <p>
            Don't have an Account? <Link to="/signup">Sign Up!</Link>
          </p>
        </form>
      </body>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startLogin: userData => dispatch(login(userData))
});
export default connect(
  null,
  mapDispatchToProps
)(LoginComponent);
