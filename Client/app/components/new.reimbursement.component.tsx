import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { generateId } from '../helpers/helpers';
import { connect } from 'react-redux';
import { submittedTicket } from '../actions/reim.actions';
import { RouteProps } from 'react-router';

interface IProps extends RouteProps {
  history?: any;
  username: string;
  addNewTicket: any;
}

export class NewReimbursementComponent extends Component<IProps, any> {
  state = {
    items: [
      {
        id: '',
        title: '',
        amount: 0,
        description: '',
        timeofexpense: 0
      }
    ]
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const noZeroAmounts = this.state.items.some(
      item =>
        item.amount === 0 ||
        item.title.length === 0 ||
        item.description.length === 0 ||
        item.timeofexpense === 0
    );
    if (noZeroAmounts) return;

    console.log('should only appear if nothing is empty');
    const reimbursement = {
      items: this.state.items,
      username: this.props.username
    };

    axios
      .post('/submitTicket', { reimbursement })
      .then(resp => resp.data)
      .then(reimbursements => this.props.addNewTicket(reimbursements))
      .then(() => {
        console.log('heading to dashboard...');
        this.props.history.push('/dashboard');
      });
  };

  addNewItem = () => {
    this.setState({
      items: [
        ...this.state.items,
        {
          id: generateId(),
          title: '',
          amount: 0,
          description: '',
          timeofexpense: 0
        }
      ]
    });
  };

  onChangeHandler = e => {
    const divId = e.target.parentNode.id;
    const elementName = e.target.name;

    const updatedState = this.state.items.map(item => {
      if (item.id != divId) {
        return item;
      }
      switch (elementName) {
        case 'title':
          return {
            ...item,
            title: e.target.value
          };
        case 'amount':
          return {
            ...item,
            amount: e.target.value
          };
        case 'description':
          return {
            ...item,
            description: e.target.value
          };
        case 'timeofexpense':
          return {
            ...item,
            timeofexpense: e.target.value
          };
        default:
          return item;
      }
    });
    this.setState({
      items: updatedState
    });
  };

  //  @ts-ignore
  componentDidMount = () =>
    this.state.items.map(item => {
      item.id = generateId();
    });

  render() {
    return (
      <body className="text-left">
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
                <Link className="nav-link" to="/login">
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <p />
        <p />
        <button
          onClick={this.addNewItem}
          type="button"
          className="btn btn-primary"
        >
          Add New Item
        </button>
        <p />
        <form onSubmit={this.onSubmitHandler}>
          {this.state.items.map((item, i) => {
            return (
              <div key={i} id={item.id}>
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  name="title"
                  value={item.title}
                  onChange={this.onChangeHandler}
                  required
                />
                <label htmlFor="amount">Total Amount:</label>
                <input
                  type="text"
                  name="amount"
                  value={item.amount}
                  onChange={this.onChangeHandler}
                  required
                />
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  name="description"
                  value={item.description}
                  onChange={this.onChangeHandler}
                  required
                />
                <label htmlFor="timeofexpense">Time of Expense:</label>
                <input
                  type="date"
                  name="timeofexpense"
                  value={item.timeofexpense}
                  onChange={this.onChangeHandler}
                  required
                />
                <p />
              </div>
            );
          })}
          <button type="submit" className="btn btn-primary">
            Submit Reimbursement Request
          </button>
        </form>
      </body>
    );
  }
}

const mapStateToProps = state => ({
  username: state.user.username
});

const mapDispatchToProps = dispatch => ({
  addNewTicket: ticketData => dispatch(submittedTicket(ticketData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewReimbursementComponent);
