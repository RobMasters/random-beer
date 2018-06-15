import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { fetchBeer } from '../actions';
import {
  beerName,
  beerDescription,
  currentBreweries,
} from '../selectors';

class Beer extends Component {
  static propTypes = {
    fetchBeer: PropTypes.func.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    breweries: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })),
  };

  static defaultProps = {
    name: null,
    description: null,
    breweries: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      fetchingBeer: !props.name,
    }
  }

  componentDidMount() {
    console.log('mounted', this.props.id);
    if (!this.props.name) {
      console.log(`Fetch beer ${this.props.id} on mount`);
      this.props.fetchBeer(this.props.id).then(this.onFetchedBeer);
    }
  }

  onFetchedBeer = beer => {
    this.setState({ fetchingBeer: false });
  };

  render() {
    const {
      name,
      description,
      breweries,
    } = this.props;

    if (this.state.fetchingBeer) {
      return <h2>Brewing...</h2>;
    }

    return (
      <div className="beer">
        <h2>Beer: {name}</h2>
        <p>{description}</p>
        {!!breweries.length && (
          <React.Fragment>
            <h3>Brewery details:</h3>
            <ul>
              {breweries.map(brewery => (
                <li key={brewery.id}>
                  <Link to={`/brewery/${brewery.id}`}>{brewery.name}</Link>
                </li>
              ))}
            </ul>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;

  return {
    id,
    name: beerName(state),
    description: beerDescription(state),
    breweries: currentBreweries(state),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchBeer: id => dispatch(fetchBeer(id)),
  loadedBeer: ({ id }) => dispatch(push(`/beer/${id}`)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Beer);
