import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Drinks from "./pages/Drinks";
import Foods from "./pages/Foods";
import Profile from "./components/Profile";
import FavoriteRecipes from "./components/FavoriteRecipes";
import DoneRecipes from "./pages/DoneRecipes";
import Food from "./pages/Food";
import Drink from "./pages/Drink";
import FoodInProgrees from "./pages/FoodInProgress";
import DrinkInProgrees from "./pages/DrinkInProgress";

import './css/responsive.css';

function App() {
  return (
    <Switch>
      <Route exact path="/recipesapp" render={(props) => <Login {...props} />} />
      <Route exact path="/recipesapp/foods" render={(props) => <Foods {...props} />} />
      <Route exact path="/recipesapp/drinks" component={Drinks} />
      <Route exact path="/recipesapp/foods/:id" component={Food} />
      <Route exact path="/recipesapp/drinks/:id" component={Drink} />
      <Route
        exact
        path="/recipesapp/foods/:id/in-progress"
        render={(props) => <FoodInProgrees {...props} />}
      />
      <Route
        path="/recipesapp/drinks/:id/in-progress"
        render={(props) => <DrinkInProgrees {...props} />}
      />
      <Route path="/recipesapp/profile" component={Profile} />
      <Route path="/recipesapp/done-recipes" component={DoneRecipes} />
      <Route path="/recipesapp/favorite-recipes" component={FavoriteRecipes} />
    </Switch>
  );
}

export default App;
