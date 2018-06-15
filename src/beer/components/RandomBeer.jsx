import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import Loader from './Loader';
import { fetchBeer } from '../actions';
import { isValidBeer } from '../helpers';

class RandomBeer extends Component {
  static propTypes = {
    fetchBeer: PropTypes.func.isRequired,
    loadedBeer: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
  };

  state = {
    brewCount: 0,
  };

  componentDidMount() {
    this.fetchBeer();
  }

  fetchBeer = () => {
    this.props.fetchBeer()
      .then((beer) => {
        if (!isValidBeer(beer)) {
          console.log('Not valid. Load another beer...');
          return this.setState(prevState => ({ brewCount: prevState.brewCount + 1 }), this.fetchBeer);
        }
        this.props.loadedBeer(beer);
      })
      .catch(this.props.onError)
    ;
  };

  render() {
    let message = 'Brewing...';
    if (this.state.brewCount === 1) {
      message = 'Still brewing...';
    } else if (this.state.brewCount > 1) {
      message = 'Gone to change the barrel...';
    }

    return <Loader message={message} />;
  }
}

const mapDispatchToProps = dispatch => ({
  fetchBeer: () => dispatch(fetchBeer()),
  loadedBeer: ({ id }) => dispatch(push(`/beer/${id}`)),
  onError: () => dispatch(push(`/error`)),
});

export default connect(null, mapDispatchToProps)(RandomBeer);
