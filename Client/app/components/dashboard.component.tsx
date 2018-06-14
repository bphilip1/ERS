import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
export class DashboardComponent extends Component<any, any> {
  state = {
    username: '',
    password: ''
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const user = {
      username: 'bird',
      password: '12345'
    };

    axios
      .get('/viewAll', {
        params: {
          username: user.username
        }
      })
      .then(resp => resp.data)
      .then(user => {
        console.log(user);
      });
  };

  render() {
    return (
      <div>
        {this.props.userRole === 'employee' && (
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Timesubmitted</th>
                <th>Amount</th>
                <th>Approver</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.props.reimbursements.map(item => {
                const numToDate = new Date(item.timesubmitted);
                return (
                  <tr key={item.timesubmitted}>
                    <td>{item.username}</td>
                    <td>
                      {numToDate.getMonth() +
                        1 +
                        '/' +
                        numToDate.getDate() +
                        '/' +
                        numToDate.getFullYear()}
                    </td>
                    <td>
                      {item.items
                        .map(obj => parseFloat(obj.amount))
                        .reduce((total, num) => total + num)}
                    </td>
                    <td>{item.approver}</td>
                    <td>{item.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {this.props.userRole === 'admin' && <p>WELCOME ADMIN</p>}
        <Link to="/create">create reimbursement</Link>
        <p>
          <button type="submit" onSubmit={this.onSubmitHandler}>
            populate
          </button>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reimbursements: state.reim.reimbursements,
  userRole: state.user.role
});

export default connect(mapStateToProps)(DashboardComponent);
