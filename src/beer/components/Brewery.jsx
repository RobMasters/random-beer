import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goBack, push } from 'react-router-redux';
import { Button, Icon, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import Loader from './Loader';
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
    established: PropTypes.number,
    image: PropTypes.string,
  };

  static defaultProps = {
    name: null,
    description: null,
    established: null,
    image: null,
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

  onFetchedBrewery = () => {
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
      established,
      image,
    } = this.props;

    if (this.state.fetchingBrewery) {
      return <Loader />;
    }

    return (
      <div className="brewery">
        <Row gutter={16}>
          {image && (
            <Col span={8}>
              <img className="fit-column" src={image} alt={name} />
            </Col>
          )}

          <Col span={image ? 16 : 24}>
            <Row gutter={16}>
              <Col span={16}>
                <h2>Brewery: {name}</h2>
                {established && <p>Established: {established}</p>}
              </Col>
              <Col span={8} style={{ textAlign: 'right' }}>
                <Button type="primary" onClick={this.handleGoBack}>
                  <Icon type="left" />Go back
                </Button>
              </Col>
            </Row>
            <p>{description}</p>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const breweryId = ownProps.match.params.id;
  const brewery = getBrewery(state, breweryId);

  let image;
  if (brewery.images && brewery.images.squareMedium) {
    image = brewery.images.squareMedium;
  }

  return {
    breweryId,
    ...brewery,
    image,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchBrewery: () => dispatch(fetchBrewery(ownProps.match.params.id)),
  goBack: () => dispatch(goBack()),
  goHome: () => dispatch(push('/')),
});


export default connect(mapStateToProps, mapDispatchToProps)(Brewery);
