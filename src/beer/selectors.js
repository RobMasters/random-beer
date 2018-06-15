import { STATE_KEY } from './constants';

const beerName = state => state[STATE_KEY].name;
const beerDescription = state => state[STATE_KEY].description;
const beerImage = state => state[STATE_KEY].labels.medium;

const currentBreweries = state => state[STATE_KEY].breweries.map(id => ({
  id,
  name: state[STATE_KEY].cachedBreweries[id].name,
}));

const getBrewery = (state, id) => state[STATE_KEY].cachedBreweries[id] || {};

export {
  beerName,
  beerDescription,
  beerImage,
  currentBreweries,
  getBrewery,
};
