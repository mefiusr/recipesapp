import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchCategories,
  fetchCategoriesContent,
  fetchCategoriesContentDrink,
  fetchCategoriesDrinks,
  fetchDrinkRecomend,
  fetchFoodRecomend,
} from '../services/fetchAPIs';
import { recipeDetails, foodOrDrink } from '../redux/actions';

class Recipes extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      filter: false,
    };
  }

  componentDidMount = () => {
    this.fetchInitial();
    this.getCategories();
  };

  fetchInitial = async () => {
    const { url, recipesDispatch } = this.props;
    const MAX_RECIPES = 12;

    if (url.includes('foods')) {
      const data = await fetchFoodRecomend();

      const fixArray = data.meals.filter((_meal, index) => index < MAX_RECIPES);
      recipesDispatch(fixArray);
    }
    if (url.includes('drink')) {
      const data = await fetchDrinkRecomend();

      const fixArray = data.drinks.filter(
        (_meal, index) => index < MAX_RECIPES,
      );
      recipesDispatch(fixArray);
    }
  };

  getCategories = async () => {
    const { url } = this.props;
    const MAX_CATEGORIE = 5;

    if (url.includes('foods')) {
      const data = await fetchCategories();
      const fixArray = data.meals.filter(
        (_categorie, index) => index < MAX_CATEGORIE,
      );

      this.setState({ categories: fixArray });
    }
    if (url.includes('drinks')) {
      const data = await fetchCategoriesDrinks();
      const fixArray = data.drinks.filter(
        (_categorie, index) => index < MAX_CATEGORIE,
      );

      this.setState({ categories: fixArray });
    }
  };

  handleClick = async (categorie) => {
    const { url, recipesDispatch } = this.props;
    const { filter } = this.state;
    const MAX_RECIPES = 12;

    if (url.includes('foods')) {
      if (filter === false) {
        const data = await fetchCategoriesContent(categorie.target.innerText);
        const fixArray = data.meals.filter((_meal, index) => index < MAX_RECIPES);
        recipesDispatch(fixArray);
        this.setState({ filter: true });
      } else {
        this.fetchInitial();
        this.setState({ filter: false });
      }
    } else if (filter === false) {
      const data = await fetchCategoriesContentDrink(categorie.target.innerText);
      const fixArray = data.drinks.filter((_meal, index) => index < MAX_RECIPES);
      recipesDispatch(fixArray);
      this.setState({ filter: true });
    } else {
      this.fetchInitial();
      this.setState({ filter: false });
    }
  }

  render() {
    const { recipes, url } = this.props;
    const { categories } = this.state;
    return (
      <section className="sectionRecipes">

        <div className="categories">
          {categories.map((categorie, index) => (
            <button
              className="btn-header btns"
              type="button"
              key={ index }
              data-testid={ `${categorie.strCategory}-category-filter` }
              onClick={ (event) => this.handleClick(event) }
            >
              {categorie.strCategory}
            </button>
          ))}
        </div>

        <button
          className="btn-header btns btnAll"
          type="button"
          data-testid="All-category-filter"
          onClick={ () => this.fetchInitial() }
        >
          All

        </button>

        {recipes
          && recipes.map((recipe, index) => (
            <div
              key={ index }
              className="divCategories"
              data-testid={ `${index}-recipe-card` }
            >

              <Link
                to={ url.includes('foods') ? `/recipesapp/foods/${recipe.idMeal}`
                  : `/recipesapp/drinks/${recipe.idDrink}` }
              >
                <h4 data-testid={ `${index}-card-name` }>
                  {recipe.strMeal || recipe.strDrink}
                </h4>

              <img
                className="imgRecipes"
                data-testid={ `${index}-card-img` }
                src={ recipe.strMealThumb || recipe.strDrinkThumb }
                alt="Recipe"
                />
                </Link>

            </div>
          ))}

      </section>
    );
  }
}

Recipes.propTypes = {
  recipes: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  recipesDispatch: (recipe) => dispatch(foodOrDrink(recipe)),
  recipeDetailsDispatch: (food) => dispatch(recipeDetails(food)),
});

export default connect(null, mapDispatchToProps)(Recipes);
