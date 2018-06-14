import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchBeer } from './actions';
import { beerName, beerDescription } from './selectors';

class RandomBeer extends Component {
  static propTypes = {
    fetchBeer: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchBeer();
  }

  render() {
    const {
      name,
      description,
    } = this.props;

    return (
      <div className="beer">
        <h2>Random Beer: {name}</h2>
        <p>{description}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  name: beerName(state),
  description: beerDescription(state),
});

const mapDispatchToProps = dispatch => ({
  fetchBeer: () => dispatch(fetchBeer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RandomBeer);
