import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';

export default class DoneRecipes extends Component {
  render() {
    const { match } = this.props;
    return (
      <Header url={ match.url } />
    );
  }
}

DoneRecipes.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
