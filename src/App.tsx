import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
  Link,
} from "react-router-dom";
import Recipes from "./components/Recipes";
import ShoppingList from "./components/ShoppingList";

interface Ingredients {
  id: string;
  ingredientName: string;
  quantity: string;
}

interface RecipesForm {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  ingredients: Array<Ingredients>;
}

function App() {
  const [ingredeinList, setIngredeinList] = useState<Array<Ingredients>>([]);
  const [recipeList, setRecipeList] = useState<Array<RecipesForm>>([]);

  return (
    <Router>
      <nav className="nav">
        <Link to="/" className="nav-link brandname">
          Recipe Book
        </Link>
        <NavLink to="/recipes" className="nav-link" activeClassName="active">
          Recipes
        </NavLink>
        <NavLink
          to="/shopping-list"
          className="nav-link"
          activeClassName="active"
        >
          Shopping List
        </NavLink>
      </nav>
      <Switch>
        <Redirect exact from="/" to="/recipes" />
        <Route path="/recipes">
          <Recipes
            ingredeinList={ingredeinList}
            setIngredeinList={setIngredeinList}
            recipeList={recipeList}
            setRecipeList={setRecipeList}
          />
        </Route>
        <Route path="/shopping-list">
          <ShoppingList
            ingredeinList={ingredeinList}
            setIngredeinList={setIngredeinList}
            recipeList={recipeList}
            setRecipeList={setRecipeList}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
