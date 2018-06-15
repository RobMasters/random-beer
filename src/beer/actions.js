import fetch from 'cross-fetch';
import { RECEIVE_BEER, RECEIVE_BREWERY } from './actionTypes';
import { API_KEY } from '../constants';

const receiveBeer = ({ id, name, description, breweries, labels }) => ({
  type: RECEIVE_BEER,
  id,
  name,
  description,
  breweries,
  labels,
});

const fetchBeer = (id = 'random') => (
  dispatch => (
    fetch(`/api.brewerydb.com/v2/beer/${id}/?withBreweries=Y&hasLabels=Y&key=${API_KEY}`)
      .then(response => response.json())
      .then(({ data, status, errorMessage }) => {
        if (status !== 'success') {
          throw errorMessage;
        }
        dispatch(receiveBeer(data));
        return data;
      })
      .catch((e) => {
        console.log('Failed to load beer: ', e);
        throw e;
      })
  )
);

const receiveBrewery = ({ id, name, description, established, images }) => ({
  type: RECEIVE_BREWERY,
  id,
  name,
  description,
  established,
  images,
});

const fetchBrewery = id => (
  dispatch => (
    fetch(`/api.brewerydb.com/v2/brewery/${id}?key=${API_KEY}`)
      .then(response => response.json())
      .then(({ data, status, errorMessage }) => {
        if (status !== 'success') {
          throw errorMessage;
        }
        dispatch(receiveBrewery(data));
        return data;
      })
      .catch((e) => {
        console.log('Failed to load brewery: ', e);
      })
  )
);


export {
  fetchBeer,
  fetchBrewery,
};
