import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      .then(user => user)
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
      <form onSubmit={this.onSubmitHandler}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.onChangeHandler}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.onChangeHandler}
        />
        <button type="submit"> Login</button>
        <p>
          Don't have an Account? <Link to="/signup">Sign Up!</Link>
        </p>
      </form>
    );
  }
}

export default LoginComponent;
