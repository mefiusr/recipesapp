export const fetchAPIIngredient = async (ingrediente) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const data = await response.json();
  return data;
};

export const fetchAPIName = async (name) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data;
};

export const fetchAPIFirst = async (firstletter) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstletter}`);
  const data = await response.json();
  return data;
};

export const fetchIngredientDrinks = async (ingrediente) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const data = await response.json();
  return data;
};

export const fetchAPINameDrinks = async (name) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data;
};

export const fetchAPIFirstDrinks = async (firstletter) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstletter}`);
  const data = await response.json();
  return data;
};

export const fetchCategories = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data;
};

export const fetchCategoriesDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data;
};

export const fetchCategoriesContent = async (categorie) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`);
  const data = await response.json();
  return data;
};

export const fetchCategoriesContentDrink = async (categorie) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categorie}`);
  const data = await response.json();
  return data;
};

export const fetchFoodId = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data;
};

export const fetchDrinkId = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data;
};

export const fetchFoodRecomend = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data;
};

export const fetchDrinkRecomend = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data;
};
