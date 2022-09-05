import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchDrinkId, fetchFoodId } from '../services/fetchAPIs';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

class RecipeInProgress extends Component {
  constructor() {
    super();

    this.state = {
      fetchInitial: [],
      ingredients: [],
      measures: [],
      checks: [],
      activeButton: true,
    };
  }

  componentDidMount = () => {
    this.fetchIds();
  }

  fetchIds = async () => {
    const url = window.location.pathname;
    const id = url.split('/');

    if (url.includes('foods')) {
      const data = await fetchFoodId(id[2]);
      this.setState({ fetchInitial: data.meals });
    }
    if (url.includes('drinks')) {
      const data = await fetchDrinkId(id[2]);
      this.setState({ fetchInitial: data.drinks });
    }
    this.getIngredients();
  };

  getIngredients = () => {
    const { fetchInitial } = this.state;

    const ingredients = fetchInitial
      && Object.keys(fetchInitial[0])
        .filter((ingredient) => ingredient.includes('strIngredient'));
    this.setState({ ingredients });

    const measures = fetchInitial
      && Object.keys(fetchInitial[0]).filter((measure) => measure.includes('strMeasure'));
    this.setState({ measures });

    this.checkIngredients();
  };

   checkIngredients = () => {
     const { fetchInitial, ingredients } = this.state;
     const checks = [];

     ingredients.filter((i, index) => fetchInitial[0][i[index]] !== null
    && fetchInitial[0][i[index]] !== '');

     checks.push(false);
     this.setState({ checks });

     const initial = JSON.parse(localStorage.getItem('url'));

     if (initial === undefined || initial === null) {
       this.setState({ checks });
     } else {
       this.setState({ checks: initial });
       const bool = initial.every((b) => b === true);
       this.setState({ activeButton: !bool });
     }
   };

  handleClick = (index) => {
    const { checks } = this.state;

    const newArray = checks;
    newArray[index] = !checks[index];

    const bool = newArray.every((b) => b === true);
    console.log(bool, !bool);

    this.setState({ checks: newArray });
    this.setState({ activeButton: bool });

    localStorage.setItem('url', JSON.stringify(newArray));
  };

  render() {
    const { fetchInitial, ingredients, measures, activeButton, checks } = this.state;
    const url = window.location.pathname;
    const id = url.split('/');
    return (
      <section>
        {fetchInitial && fetchInitial.map((recipe, index) => (
          <section key={ index }>
            <h1 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h1>

            <img
              data-testid="recipe-photo"
              src={ `${recipe.strMealThumb}` || `${recipe.strDrinkThumb}` }
              alt="Food and Drink"
            />

            <p data-testid="recipe-category">
              {`Category: ${recipe.strCategory} - ${recipe.strAlcoholic}`}
            </p>

            {ingredients && ingredients.map((ingredient, index2) => (
              (fetchInitial[0][ingredient] !== '' && fetchInitial[0][measures[index2]]
              !== ' ' && fetchInitial[0][measures[index2]] !== null
              ) && (
                <div key={ index2 }>
                  <label
                    htmlFor="ingredients"
                    data-testid={ `${index2}-ingredient-step` }
                  >
                    <input
                      className="checksboxs"
                      type="checkbox"
                      id="ingredients"
                      onClick={ () => this.handleClick(index2) }
                      checked={ checks ? checks[index2] : true }
                    />
                    { `Ingredients: ${fetchInitial[0][ingredient]} - 
                   ${fetchInitial[0][measures[index2]]}` }
                  </label>
                </div>)
            )) }

            <p data-testid="instructions">{`Instructions: ${recipe.strInstructions}`}</p>
          </section>
        ))}
        <FavoriteButton url={ url } id={ id[2] } />
        <ShareButton url={ `${id[0]}/${id[1]}/${id[2]}` } id={ id } />
        <Link to="/done-recipes">
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ activeButton }
          >
            Finish recipe

          </button>
        </Link>
      </section>
    );
  }
}

RecipeInProgress.propTypes = {
  ingredients: PropTypes.shape({
    map: PropTypes.func,
  }),
  measures: PropTypes.any,
  recipes: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

export default RecipeInProgress;
