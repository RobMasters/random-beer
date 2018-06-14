import update from 'immutability-helper';
import { RECEIVE_BEER } from './actionTypes';

const initialState = {
  name: '',
  description: '',
  breweries: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case RECEIVE_BEER:
      return update(state, {
        name: { $set: action.name },
        description: { $set: action.description },
      });

    default:
      return state;
  }
};

export default reducer;
