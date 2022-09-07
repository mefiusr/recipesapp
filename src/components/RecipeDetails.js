import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDrinkId, fetchDrinkRecomend, fetchFoodId, fetchFoodRecomend,
} from '../services/fetchAPIs';
import { foodOrDrink, ingredientsRecipes, measuresRecipes,
} from '../redux/actions';
import '../css/recipesDetails.css';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

class RecipeDetails extends Component {
  constructor() {
    super();

    this.state = {
      ingredients: [],
      measures: [],
      recomends: [],
      renderButton: true,
      btnInProgess: false,
    };
  }

  componentDidMount = () => {
    this.fetchIds();
    this.doneRecipes();
    this.inProgressRecipes();
  };

  doneRecipes = () => {
    const { id } = this.props;

    const getLocalDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getLocalDone) {
      const local = getLocalDone.some((recipe) => recipe.id === id);
      if (local) {
        this.setState({ renderButton: false });
      }
    }
  };

  setProgressRecipes = () => {
    const { url, id } = this.props;
    const receita = url.includes('foods') ? 'meals' : 'cocktails';
    const getLocalProgress = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    if (getLocalProgress) {
      const objeto = {
        ...getLocalProgress,
        [receita]: {
          ...getLocalProgress[receita],
          [id]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(objeto));
    } else {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({ [receita]: { [id]: [] } }),
      );
    }
  };

  inProgressRecipes = () => {
    const { url, id } = this.props;
    const receita = url.includes('foods') ? 'meals' : 'cocktails';
    const getLocalProgress = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    if (getLocalProgress !== null) {
      const inProgress = Object.keys(getLocalProgress[receita]);
      const local = inProgress.some((e) => e === id);
      if (local) {
        this.setState({ btnInProgess: true });
      }
    }
  };

  fetchIds = async () => {
    const { url, id, recipesDispatch } = this.props;

    if (url.includes('foods')) {
      const data = await fetchFoodId(id);
      recipesDispatch(data.meals);
      this.getIngredients();
    }
    if (url.includes('drinks')) {
      const data = await fetchDrinkId(id);
      recipesDispatch(data.drinks);
      this.getIngredients();
    }
  };

  getIngredients = () => {
    const { recipes, ingredientsDispatch, measuresDispatch } = this.props;

    const ingredients = recipes
      && Object.keys(recipes[0])
        .filter((ingredient) => ingredient.includes('strIngredient'));
    this.setState({ ingredients });
    ingredientsDispatch(ingredients);

    const measures = recipes
      && Object.keys(recipes[0]).filter((measure) => measure.includes('strMeasure'));
    this.setState({ measures });
    measuresDispatch(measures);

    this.getRecomends();
  };

  getRecomends = async () => {
    const { url } = this.props;
    const MAX_LENGTH_RECOMEND = 6;

    if (url.includes('foods')) {
      const data = await fetchDrinkRecomend();
      this.setState({ recomends: data.drinks.slice(0, MAX_LENGTH_RECOMEND) });
    } else {
      const data = await fetchFoodRecomend();
      this.setState({ recomends: data.meals.slice(0, MAX_LENGTH_RECOMEND) });
    }
  };

  render() {
    const { url, recipes, id } = this.props;
    console.log(url)
    const { ingredients, measures, recomends, renderButton, btnInProgess } = this.state;

    return (
      <>
        <h1>Recipe Details</h1>
        {recipes && recipes.map((recipe, index) => (
          <section key={ index } className="secDetails">
            <h1 data-testid="recipe-title">
              {recipe.strDrink || recipe.strMeal}
            </h1>
            <img
              className="imgDetails"
              data-testid="recipe-photo"
              src={ url.includes('foods') ? `${recipe.strMealThumb}`
                : `${recipe.strDrinkThumb}` }
              alt="Drink or Meal"
            />
            <hr />
            <p data-testid="recipe-category">
              {url.includes('drinks') ? `${recipe.strCategory} - ${recipe.strAlcoholic}`
                : `${recipe.strCategory}`}
            </p>

            {ingredients && ingredients.map((ingredient, index2) => (
              (recipes[0][ingredient] !== '' && recipes[0][measures[index2]] !== ' '
                    && recipes[0][measures[index2]] !== null
              ) && (
                <div key={ `${index2}${ingredient}` }>
                  <p data-testid={ `${index2}-ingredient-name-and-measure` }>
                    {`Ingredients: ${recipes[0][ingredient]}
                      - ${recipes[0][measures[index2]]}`}
                  </p>
                </div>)

            )) }
            <hr />
            <p data-testid="instructions">
              {`Instructions: ${recipe.strInstructions}`}
            </p>

            {url.includes('foods') ? (
              <iframe
                className="youtube"
                data-testid="video"
                src={ `${recipe.strYoutube.replace('watch?v=', 'embed/')}` }
                title="Vídeo"
                allowFullScreen
              />
            ) : (
              ''
            )}
            <hr />
            <div className="div-recomend">
              <h4>Recomendation</h4>
              <div className="scrollh">
                {recomends
                    && recomends.map((recomend, index3) => (
                      <div
                        className="item-card"
                        key={ index3 }
                        data-testid={ `${index3}-recomendation-card` }
                      >
                        <p data-testid={ `${index3}-recomendation-title` }>
                          {recomend.strMeal || recomend.strDrink}
                        </p>
                        <img
                          className="imgRecomends"
                          src={ url.includes('foods') ? `${recomend.strDrinkThumb}`
                            : `${recomend.strMealThumb}` }
                          alt="Drink or Meal"
                        />
                      </div>
                    ))}
              </div>
            </div>
            {renderButton && (
              <Link to={ `/recipesapp/${id}/in-progress` }>
                <div className="divBtnStart">
                  <button
                    className="btnStart"
                    type="button"
                    data-testid="start-recipe-btn"
                    onClick={ () => this.setProgressRecipes() }
                  >
                    {btnInProgess ? 'Continue Recipe' : 'Start Recipe'}
                  </button>
                </div>
              </Link>
            )}
            <div className="btnFavoriteAndShare">
              <FavoriteButton id={ id } url={ url } />
              <ShareButton url={ url } />
            </div>
          </section>
        ))}
      </>
    );
  }
}
RecipeDetails.propTypes = {
  id: PropTypes.string,
  recipes: PropTypes.shape({
    map: PropTypes.func,
  }),
  recipesDispatch: PropTypes.func,
  url: PropTypes.shape({
    includes: PropTypes.func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  recipesDispatch: (recipe) => dispatch(foodOrDrink(recipe)),
  ingredientsDispatch: (ingredients) => dispatch(ingredientsRecipes(ingredients)),
  measuresDispatch: (measures) => dispatch(measuresRecipes(measures)),
});

const mapStateToProps = (state) => ({
  recipes: state.recipes.recipes,
});
export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
