import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { goBack, push } from 'react-router-redux';
import { Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import { fetchBrewery } from '../actions';
import {
  getBrewery,
} from '../selectors';

class Brewery extends Component {
  static propTypes = {
    fetchBrewery: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    goHome: PropTypes.func.isRequired,
    breweryId: PropTypes.string.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
  };

  static defaultProps = {
    name: null,
    description: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      fetchingBrewery: !props.name,
    }
  }

  componentDidMount() {
    if (!this.props.name) {
      this.props.fetchBrewery().then(this.onFetchedBrewery);
    }
  }

  onFetchedBrewery = beer => {
    this.setState({ fetchingBrewery: false });
  };

  handleGoBack = () => {
    if (this.props.history.length > 2) {
      // If there is valid history, then navigate to the previous page
      this.props.goBack();
    } else {
      this.props.goHome();
    }
  };

  render() {
    const {
      name,
      description,
    } = this.props;

    if (this.state.fetchingBrewery) {
      return <h2>Brewing...</h2>;
    }

    return (
      <div className="brewery">
        <h2>Brewery: {name}</h2>
        <p>{description}</p>

        <Button type="primary" onClick={this.handleGoBack}>
          <Icon type="left" />Go back
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const breweryId = ownProps.match.params.id;
  const brewery = getBrewery(state, breweryId);

  return {
    breweryId,
    ...brewery,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchBrewery: () => dispatch(fetchBrewery(ownProps.match.params.id)),
  goBack: () => dispatch(goBack()),
  goHome: () => dispatch(push('/')),
});


export default connect(mapStateToProps, mapDispatchToProps)(Brewery);
