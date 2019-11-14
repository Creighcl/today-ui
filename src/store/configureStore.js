import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import userDetailsReducer from '../reducers/userDetails';
import memoryReducer from '../reducers/memories';
import dayReducer from '../reducers/day';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      userDetails: userDetailsReducer, 
      auth: authReducer,
      days: dayReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
