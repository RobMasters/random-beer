import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import { beerReducer } from './beer';

const rootReducer = combineReducers({
  router: routerReducer,
  beer: beerReducer,
});

export default rootReducer;
