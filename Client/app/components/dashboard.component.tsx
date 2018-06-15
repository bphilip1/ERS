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

  submitAdminApproval = e => {
    const timesubmitted = e.target.parentNode.parentNode.dataset.uid;
    const username = e.target.parentNode.parentNode.dataset.username;
    const verdict = e.target.dataset.verdict;

    const dataObj = {
      firstName: this.props.firstname,
      userRole: this.props.userRole,
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
                  Dashboard
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">
                  Add Reimbursement
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <p />
        <div className="container">
          <div className="row">
            <div className="col">
              {this.props.userRole === 'employee' && (
                <table className="table">
                  <thead className="thead-dark">
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
                      {this.props.everyReimbursement.map(item => {
                        const numToDate = new Date(item.timesubmitted);
                        const checkHour =
                          +numToDate.getHours() > 12
                            ? +numToDate.getHours() - 12
                            : numToDate.getHours();

                        return (
                          <tr
                            key={item.timesubmitted}
                            data-uid={item.timesubmitted}
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
                                type="button"
                                onClick={this.submitAdminApproval}
                                data-verdict="approved"
                                className="btn btn-success"
                              >
                                Approve
                              </button>{' '}
                              <button
                                type="button"
                                onClick={this.submitAdminApproval}
                                data-verdict="denied"
                                className="btn btn-danger"
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
  username: state.user.username,
  everyReimbursement: state.reim.everyReimbursement,
  firstname: state.user.firstname
});

const mapDispatchToProps = dispatch => ({
  adminA: userdata => dispatch(adminApproval(userdata))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent);
