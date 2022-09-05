import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

import '../css/foodsAndDrinks.css';

class Foods extends Component {
  render() {
    const { match, history, recipes, recipeDetails } = this.props;
    return (
      <>
        <Header url={ match.url } history={ history } />

        <Recipes recipes={ recipes } url={ match.url } />

        { recipeDetails && history.push(`/foods/${recipes[0].idMeal}`)}

        <Footer history={ history } />
      </>
    );
  }
}

Foods.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  recipes: state.recipes.recipes,
  recipeDetails: state.recipes.recipeDetails,
});

export default connect(mapStateToProps, null)(Foods);
