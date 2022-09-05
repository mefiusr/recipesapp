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

function App() {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Login {...props} />} />
      <Route exact path="/foods" render={(props) => <Foods {...props} />} />
      <Route exact path="/drinks" component={Drinks} />
      <Route exact path="/foods/:id" component={Food} />
      <Route exact path="/drinks/:id" component={Drink} />
      <Route
        exact
        path="/foods/:id/in-progress"
        render={(props) => <FoodInProgrees {...props} />}
      />
      <Route
        path="/drinks/:id/in-progress"
        render={(props) => <DrinkInProgrees {...props} />}
      />
      <Route path="/profile" component={Profile} />
      <Route path="/done-recipes" component={DoneRecipes} />
      <Route path="/favorite-recipes" component={FavoriteRecipes} />
    </Switch>
  );
}

export default App;
