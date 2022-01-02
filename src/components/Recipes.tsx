import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import FormComponent from "./FormComponent";
import RecipeDetail from "./RecipeDetail";
import EditComponent from "./EditComponent";

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
interface RecipesProps {
  ingredeinList: Array<Ingredients>;
  setIngredeinList: (e: Array<Ingredients>) => void;
  recipeList: Array<RecipesForm>;
  setRecipeList: (e: Array<RecipesForm>) => void;
}

interface RecipesForm {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  ingredients: Array<Ingredients>;
}

const Recipes: React.FC<RecipesProps> = ({
  ingredeinList,
  setIngredeinList,
}) => {
  const [recipeList, setRecipeList] = useState<Array<RecipesForm>>([]);
  const [currentRecipe, setCurrentRecipe] = useState<RecipesForm>({
    id: "",
    name: "",
    imageUrl: "",
    description: "",
    ingredients: [],
  });

  return (
    <div className="recipes">
      <div className="container-fluid">
        <div className="row">
          <div className="col-6 recipes-left">
            <Link to="/recipes/form" className="btn btn-success">
              New Recipe
            </Link>
            <hr />

            {recipeList.map((recipeItem) => {
              return (
                <NavLink
                  to={`/recipes/detail/${recipeItem.id}`}
                  className="recipe d-flex justify-content-between"
                  activeClassName="active"
                  key={recipeItem.id}
                >
                  <div className="recipe-left">
                    <h4>{recipeItem.name}</h4>
                    <p>{recipeItem.description}</p>
                  </div>
                  <div className="recipe-right">
                    <img src={recipeItem.imageUrl} alt="" />
                  </div>
                </NavLink>
              );
            })}
          </div>
          <div className="col-6 recipes-right">
            <Route exact path="/recipes">
              <h2>Please select a Recipe!</h2>
            </Route>
            <Route exact path="/recipes/form">
              <FormComponent
                recipeList={recipeList}
                setRecipeList={setRecipeList}
              />
            </Route>
            <Route path="/recipes/detail/:currentRecipeId">
              <RecipeDetail
                recipeList={recipeList}
                ingredeinList={ingredeinList}
                setIngredeinList={setIngredeinList}
                setRecipeList={setRecipeList}
                currentRecipe={currentRecipe}
                setCurrentRecipe={setCurrentRecipe}
              />
            </Route>
            <Route exact path="/recipes/edit/:currentRecipeId">
              <EditComponent
                recipeList={recipeList}
                setRecipeList={setRecipeList}
                currentRecipe={currentRecipe}
                setCurrentRecipe={setCurrentRecipe}
              />
            </Route>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
