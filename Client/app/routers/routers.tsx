import React, { Component } from 'react';
import { Router, Route, Switch, RouteComponentProps } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { hot } from 'react-hot-loader';
import SignUpComponent from '../components/signup.component';
import loginComponent from '../components/login.component';
import DashboardComponent from '../components/dashboard.compoenent';
import NewReimbursementComponent from '../components/new.reimbursement.component';

export const history = createHistory();

export class Routes extends Component<any, any> {
  // @ts-ignore
  shouldComponentUpdate = () => false;
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={loginComponent} />
          <Route path="/login" component={loginComponent} />
          <Route path="/signup" component={SignUpComponent} />
          <Route path="/dashboard" component={DashboardComponent} />
          <Route path="/create" component={NewReimbursementComponent} />
        </Switch>
      </Router>
    );
  }
}

export default hot(module)(Routes);
