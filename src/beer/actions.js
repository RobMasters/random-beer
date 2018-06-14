import fetch from 'cross-fetch';
import { RECEIVE_BEER } from './actionTypes';
import { API_KEY } from '../constants';

const receiveBeer = ({ name, description, breweries }) => ({
  type: RECEIVE_BEER,
  name,
  description,
  breweries,
});

const fetchBeer = () => (
  dispatch => (
    fetch(`api.brewerydb.com/v2/beer/random/?withBreweries=Y&hasLabels=Y&key=${API_KEY}`)
      .then(response => response.json())
      .then(response => (
        dispatch(receiveBeer(response.data))
      ))
  )
);

export {
  fetchBeer,
};
