import { RECIPE, FOOD, INGREDIENTS, MEASURES, URLS, ID } from '../actions';

const INITIAL_STATE = {
  recipes: '',
  recipeDetails: false,
  ingredients: [],
  measures: [],
  url: '',
  id: '',
};

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECIPE:
    return {
      ...state,
      recipes: action.payload,
    };
  case FOOD:
    return {
      ...state,
      recipeDetails: true,
    };
  case INGREDIENTS:
    return {
      ...state,
      ingredients: action.payload,
    };
  case MEASURES:
    return {
      ...state,
      measures: action.payload,
    };
  case URLS:
    return {
      ...state,
      url: action.payload,
    };
  case ID:
    return {
      ...state,
      id: action.payload,
    };
  default:
    return state;
  }
};

export default recipes;
