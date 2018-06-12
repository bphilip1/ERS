import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
        console.log(user);
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
        <label htmlFor="fullname">Full Name:</label>
        <input
          type="text"
          name="fullname"
          value={this.state.fullname}
          onChange={this.onChangeHandler}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.onChangeHandler}
        />
        <button type="submit"> Submit to server</button>
        <p>
          Do you already have an Account? <Link to="/login">Login</Link>
        </p>
      </form>
    );
  }
}

export default SignUpComponent;
