import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

const Loader = ({ message }) => (
  <div className="spin-wrapper">
    <Spin size="large" tip={message} />
  </div>
);

Loader.propTypes = {
  message: PropTypes.string,
};

Loader.defaultProps = {
  message: 'Brewing...',
};

export default Loader;
