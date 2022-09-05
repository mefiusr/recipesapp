import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from './Header';

export default class FavoriteRecipes extends Component {
  render() {
    const { match } = this.props;
    return (
      <Header url={ match.url } />
    );
  }
}

FavoriteRecipes.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
