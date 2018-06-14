import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { adminApproval } from '../actions/user.actions';
export class DashboardComponent extends Component<any, any> {
  state = {
    username: '',
    password: ''
  };

  // onSubmitHandler = e => {
  //   e.preventDefault();

  //   const user = {
  //     username: 'bird',
  //     password: '12345'
  //   };

  //   axios
  //     .get('/viewAll', {
  //       params: {
  //         username: user.username
  //       }
  //     })
  //     .then(resp => resp.data)
  //     .then(user => {
  //       console.log(user);
  //     });
  // };

  submitAdminApproval = e => {
    const timesubmitted = e.target.dataset.key;
    const username = e.target.dataset.username;
    const verdict = e.target.dataset.verdict;

    const dataObj = {
      firstName: this.props.firstname,
      userRole: this.props.role,
      approvalDecision: verdict,
      timesubmitted: timesubmitted,
      username: username
    };

    axios.post('/verdict', { dataObj });
  };

  render() {
    return (
      <body>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/dashboard">
                  Home
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">
                  Add Reimbursement
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col">
              {this.props.userRole === 'employee' && (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Username</th>
                      <th scope="col">Timesubmitted</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Approver</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.reimbursements.map(item => {
                      const numToDate = new Date(item.timesubmitted);
                      const checkHour =
                        +numToDate.getHours() > 12
                          ? +numToDate.getHours() - 12
                          : numToDate.getHours();

                      return (
                        <tr key={item.timesubmitted}>
                          <th scope="row">{item.username}</th>
                          <td>
                            {numToDate.getMonth() +
                              1 +
                              '/' +
                              numToDate.getDate() +
                              '/' +
                              numToDate.getFullYear() +
                              ' ' +
                              (+checkHour < 10 ? '0' + checkHour : +checkHour) +
                              ':' +
                              (+numToDate.getMinutes() < 10
                                ? '0' + numToDate.getMinutes()
                                : +numToDate.getMinutes()) +
                              ' ' +
                              (+numToDate.getHours() < 12 ? 'AM' : 'PM')}
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

              {this.props.userRole === 'admin' && (
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Timesubmitted</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Approver</th>
                        <th scope="col">Status</th>
                        <th scope="col">Approve/Deny</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.reimbursements.map(item => {
                        const numToDate = new Date(item.timesubmitted);
                        const checkHour =
                          +numToDate.getHours() > 12
                            ? +numToDate.getHours() - 12
                            : numToDate.getHours();

                        return (
                          <tr
                            key={item.timesubmitted}
                            data-key={item.timesubmitted}
                            data-username={item.username}
                          >
                            <th scope="row">{item.username}</th>
                            <td>
                              {numToDate.getMonth() +
                                1 +
                                '/' +
                                numToDate.getDate() +
                                '/' +
                                numToDate.getFullYear() +
                                ' ' +
                                (+checkHour < 10
                                  ? '0' + checkHour
                                  : +checkHour) +
                                ':' +
                                (+numToDate.getMinutes() < 10
                                  ? '0' + numToDate.getMinutes()
                                  : +numToDate.getMinutes()) +
                                ' ' +
                                (+numToDate.getHours() < 12 ? 'AM' : 'PM')}
                            </td>
                            <td>
                              {item.items
                                .map(obj => parseFloat(obj.amount))
                                .reduce((total, num) => total + num)}
                            </td>
                            <td>{item.approver}</td>
                            <td>{item.status}</td>
                            <td>
                              <button
                                onClick={this.submitAdminApproval}
                                data-verdict="approved"
                              >
                                Approve
                              </button>{' '}
                              <button
                                onClick={this.submitAdminApproval}
                                data-verdict="denied"
                              >
                                Deny
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </body>
    );
  }
}

const mapStateToProps = state => ({
  reimbursements: state.reim.reimbursements,
  userRole: state.user.role,
  username: state.user.username
});

const mapDispatchToProps = dispatch => ({
  adminA: userdata => dispatch(adminApproval(userdata))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent);
