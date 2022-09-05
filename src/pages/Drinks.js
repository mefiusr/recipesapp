import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

import '../css/foodsAndDrinks.css';

class Drinks extends Component {
  render() {
    const { match, history, recipes, recipeDetails } = this.props;
    return (
      <>
        <Header url={ match.url } history={ history } />

        <Recipes recipes={ recipes } url={ match.url } />

        { recipeDetails && history.push(`/drinks/${recipes[0].idDrink}`)}

        <Footer history={ history } />
      </>
    );
  }
}

Drinks.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  recipes: state.recipes.recipes,
  recipeDetails: state.recipes.recipeDetails,
});

export default connect(mapStateToProps)(Drinks);
