import React, { Component } from 'react';
import ReactDOM from 'react-dom';
export class Welcome extends Component {
  render() {
    return <div>Homepage</div>;
  }
}

ReactDOM.render(<Welcome />, document.getElementById('root'));
