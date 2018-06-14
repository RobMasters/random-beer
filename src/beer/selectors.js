import { STATE_KEY } from './constants';

const beerName = state => state[STATE_KEY].name;
const beerDescription = state => state[STATE_KEY].description;

export {
  beerName,
  beerDescription,
};
