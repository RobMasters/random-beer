import update from 'immutability-helper';
import { RECEIVE_BEER, RECEIVE_BREWERY } from './actionTypes';

const initialState = {
  id: '',
  name: '',
  description: '',
  breweries: [],
  cachedBreweries: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case RECEIVE_BEER:
      // Transform breweries array into an object, indexed by brewery ids
      const breweries = action.breweries.reduce((acc, { id, ...brewery }) => {
        return { ...acc, [id]: brewery };
      }, {});

      return update(state, {
        id: { $set: action.id },
        name: { $set: action.name },
        description: { $set: action.description },
        breweries: { $set: Object.keys(breweries) },
        cachedBreweries: { $merge: breweries },
      });

    case RECEIVE_BREWERY:
      const { type, id, ...brewery } = action;
      return update(state, {
        cachedBreweries: { $merge: { [id]: brewery } },
      });

    default:
      return state;
  }
};

export default reducer;
