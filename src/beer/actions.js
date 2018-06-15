import fetch from 'cross-fetch';
import { RECEIVE_BEER, RECEIVE_BREWERY } from './actionTypes';
import { API_KEY } from '../constants';

const receiveBeer = ({ id, name, description, breweries }) => ({
  type: RECEIVE_BEER,
  id,
  name,
  description,
  breweries,
});

const fetchBeer = (id = 'random') => (
  dispatch => (
    fetch(`/api.brewerydb.com/v2/beer/${id}/?withBreweries=Y&hasLabels=Y&key=${API_KEY}`)
      .then(response => response.json())
      .then(({ data }) => {
        dispatch(receiveBeer(data));
        return data;
      })
  )
);

const receiveBrewery = ({ id, name, description, breweries }) => ({
  type: RECEIVE_BREWERY,
  id,
  name,
  description,
  breweries,
});

const fetchBrewery = id => (
  dispatch => (
    fetch(`/api.brewerydb.com/v2/brewery/${id}?key=${API_KEY}`)
      .then(response => response.json())
      .then(({ data }) => {
        dispatch(receiveBrewery(data));
        return data;
      })
  )
);


export {
  fetchBeer,
  fetchBrewery,
};
