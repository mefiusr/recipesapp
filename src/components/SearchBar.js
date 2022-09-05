import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { foodOrDrink, recipeDetails } from '../redux/actions';
import {
  fetchAPIFirst,
  fetchAPIFirstDrinks,
  fetchAPIIngredient,
  fetchAPIName,
  fetchAPINameDrinks,
  fetchIngredientDrinks,
} from '../services/fetchAPIs';

class SearchBar extends Component {
  constructor() {
    super();

    this.state = {
      routeFood: true,
      ingredient: '',
      name: '',
      firstLetter: false,
    };
  }

  alerta = () => {
    const { firstLetter } = this.state;
    const { inputSearch } = this.props;

    if (firstLetter && inputSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  componentDidMount = () => {
    this.checkRoute();
  };

  redirectTo = () => {
    const { recipes, recipeDetailsDispatch } = this.props;

    if (recipes.length === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } if (recipes.length === 1) {
      recipeDetailsDispatch(true);
    }
  };

  checkRoute = () => {
    const { url } = this.props;

    if (url.includes('drinks')) {
      this.setState({ routeFood: false });
    } else {
      this.setState({ routeFood: true });
    }
  };

  searchRecipe = async () => {
    const MAX_RECIPES = 12;
    const { inputSearch, recipesDispatch } = this.props;
    const { ingredient, name, routeFood } = this.state;

    if (ingredient) {
      const data = routeFood
        ? await fetchAPIIngredient(inputSearch)
        : await fetchIngredientDrinks(inputSearch);

      const fixArray = routeFood
        ? data.meals.filter((_meal, index) => index < MAX_RECIPES)
        : data.drinks.filter((_meal, index) => index < MAX_RECIPES);

      recipesDispatch(fixArray);
      this.redirectTo();
    }
    if (name) {
      const data = routeFood
        ? await fetchAPIName(inputSearch)
        : await fetchAPINameDrinks(inputSearch);

      const fixArray = routeFood
        ? data.meals.filter((_meal, index) => index < MAX_RECIPES)
        : data.drinks.filter((_meal, index) => index < MAX_RECIPES);

      recipesDispatch(fixArray);
      this.redirectTo();
    } else {
      this.alerta();

      const data = routeFood
        ? await fetchAPIFirst(inputSearch)
        : await fetchAPIFirstDrinks(inputSearch);

      const fixArray = routeFood
        ? data.meals.filter((_meal, index) => index < MAX_RECIPES)
        : data.drinks.filter((_meal, index) => index < MAX_RECIPES);

      recipesDispatch(fixArray);
      this.redirectTo();
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { routeFood } = this.state;
    return (
      <>
        <div className="inputsRadio">
          <label htmlFor="ingredient">
            <input
              name="ingredient"
              id="ingredient"
              type="radio"
              data-testid="ingredient-search-radio"
              onChange={ this.handleChange }
            />
            {' '}
            Ingredient
          </label>

          <label htmlFor="name">
            <input
              name="name"
              id="name"
              type="radio"
              data-testid="name-search-radio"
              onChange={ this.handleChange }
            />
            {' '}
            Name
          </label>

          <label htmlFor="firsLetter">
            <input
              name="firsLetter"
              id="firsLetter"
              type="radio"
              data-testid="first-letter-search-radio"
              onChange={ () => this.setState({ firstLetter: true }) }
            />
            {' '}
            First Letter
          </label>
          {routeFood ? (
            <button
              className="btn-header"
              type="button"
              data-testid="exec-search-btn"
              onClick={ () => this.searchRecipe() }
            >
              Search
            </button>
          ) : (
            <button
              className="btn-header"
              type="button"
              data-testid="exec-search-btn"
              onClick={ () => this.searchRecipe() }
            >
              Search
            </button>
          )}

        </div>
        <hr className="hrX" />
      </>
    );
  }
}

SearchBar.propTypes = {
  url: PropTypes.shape({
    includes: PropTypes.string,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  recipesDispatch: (recipe) => dispatch(foodOrDrink(recipe)),
  recipeDetailsDispatch: (food) => dispatch(recipeDetails(food)),
});

const mapStateToProps = (state) => ({
  recipes: state.recipes.recipes,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
