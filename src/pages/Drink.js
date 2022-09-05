import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeDetails from '../components/RecipeDetails';

export default class Drink extends Component {
  render() {
    const { match } = this.props;
    return (

      <RecipeDetails url={ match.url } id={ match.params.id } />

    );
  }
}

Drink.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }),
}.isRequired;
