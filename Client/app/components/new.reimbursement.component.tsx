import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { generateId } from '../helpers/helpers';
export class NewReimbursementComponent extends Component<any, any> {
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
      items: this.state.items
    };

    axios
      .post('/create', { reimbursement })
      .then(resp => resp.data)
      .then(reimbursement => {
        console.log(reimbursement);
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
      <div>
        <button onClick={this.addNewItem}>Add</button>
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
                <label htmlFor="amount">Amount:</label>
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
              </div>
            );
          })}
          <button type="submit">Submit Reimbursement</button>
        </form>
      </div>
    );
  }
}

export default NewReimbursementComponent;
