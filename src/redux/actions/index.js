export const RECIPE = 'RECIPE';
export const FOOD = 'FOOD';
export const INGREDIENTS = 'INGREDIENTS';
export const MEASURES = 'MEASURES';
export const URLS = 'URLS';
export const ID = 'ID';

export const foodOrDrink = (payload) => ({
  type: RECIPE,
  payload,
});

export const recipeDetails = (payload) => ({
  type: FOOD,
  payload,
});

export const ingredientsRecipes = (payload) => ({
  type: INGREDIENTS,
  payload,
});

export const measuresRecipes = (payload) => ({
  type: MEASURES,
  payload,
});

export const getURLS = (payload) => ({
  type: URLS,
  payload,
});

export const getID = (payload) => ({
  type: ID,
  payload,
});
