import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export class DashboardComponent extends Component<any, any> {
  state = {
    username: '',
    password: ''
  };

  //   onSubmitHandler = e => {
  //     e.preventDefault();

  //     const user = {
  //       username: this.state.username,
  //       password: this.state.password
  //     };

  //     axios
  //       .post('/login', { user })
  //       .then(resp => resp.data)
  //       .then(user => user)
  //       .then(user => this.props.history.push('/dashboard'))
  //       .catch(err => {
  //         console.log('something went wwrong on the server');
  //       });
  //   };

  render() {
    return (
      <div>
        <table>
          <tr>
            <th>Username</th>
            <th>Timesubmitted</th>
            <th>Type</th>
            <th>Items</th>
            <th>Approver</th>
            <th>Status</th>
          </tr>
          <tr>
            <td>Jill</td>
            <td>5 pm</td>
            <td>food</td>
            <td>stuff</td>
            <td>manager</td>
            <td>pending</td>
          </tr>
          <tr>
            <td>Jill</td>
            <td>7</td>
            <td>travel</td>
            <td>stuff</td>
            <td>manager</td>
            <td>pending</td>
          </tr>
        </table>
        <Link to="/create">create reimbursement</Link>
      </div>
    );
  }
}

export default DashboardComponent;
