import PropTypes from 'prop-types';
import React, { Component } from 'react';
import RecipeDetails from '../components/RecipeDetails';

export default class Food extends Component {
  render() {
    const { match } = this.props;
    return (
      <RecipeDetails url={ match.url } id={ match.params.id } />
    );
  }
}

Food.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }),
}.isRequired;
