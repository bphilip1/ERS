import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import 'react-redux';
import thunk from 'redux-thunk';
import { userReducer } from '../reducers/user.reducer';
import { reimbursementReducer } from '../reducers/reim.reducer';

const composeEnhancers =
  (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => {
  // createStore(reducers, extraPowers)
  const store = createStore(
    combineReducers({
      user: userReducer,
      reim: reimbursementReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
