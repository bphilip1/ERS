import React, { Component } from 'react';
import { Router, Route, Switch, RouteComponentProps } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { hot } from 'react-hot-loader';
import SignUpComponent from '../components/signup.component';
import loginComponent from '../components/login.component';
import DashboardComponent from '../components/dashboard.component';
import NewReimbursementComponent from '../components/new.reimbursement.component';
import { configureStore } from '../store/configure.store';
import { Provider } from 'react-redux';

const store = configureStore();
export const history = createHistory();

export class Routes extends Component<any, any> {
  // @ts-ignore
  shouldComponentUpdate = () => false;
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={loginComponent} />
            <Route path="/login" component={loginComponent} />
            <Route path="/signup" component={SignUpComponent} />
            <Route path="/dashboard" component={DashboardComponent} />
            <Route path="/create" component={NewReimbursementComponent} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default hot(module)(Routes);
