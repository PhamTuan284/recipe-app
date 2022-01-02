import { useEffect } from "react";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
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
interface RecipeDetailProps {
  ingredeinList: Array<Ingredients>;
  recipeList: Array<RecipesForm>;
  setRecipeList: (e: Array<RecipesForm>) => void;
  currentRecipe: RecipesForm;
  setIngredeinList: (e: Array<Ingredients>) => void;
  setCurrentRecipe: (e: RecipesForm) => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({
  recipeList,
  ingredeinList,
  setIngredeinList,
  setRecipeList,
  currentRecipe,
  setCurrentRecipe,
}) => {
  const { currentRecipeId } = useParams<{currentRecipeId:string}>();
  let history = useHistory();

  useEffect(() => {
    setCurrentRecipe(
      recipeList.filter((recipeItem) => {
        return recipeItem.id === currentRecipeId;
      })[0]
    );
  });

  function handleToShopping() {
    currentRecipe.ingredients.map((ingredientItem:Ingredients) => {
      setIngredeinList([...ingredeinList, ingredientItem]);
      return ingredeinList;
    });
  }

  function handleEdit() {
    history.push("/recipes/edit");
  }

  function handleDelete() {
    let cloneRecipeList = [...recipeList];
    cloneRecipeList = cloneRecipeList.filter((recipeItem) => {
      return recipeItem.id !== currentRecipeId;
    });
    setRecipeList(cloneRecipeList);
    history.push("/recipes");
  }

  if (currentRecipe) {
    return (
      <div className="recipe-detail">
        <img src={currentRecipe.imageUrl} alt="" />
        <h2>{currentRecipe.name}</h2>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown button
          </button>

          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <span className="dropdown-item" onClick={handleToShopping}>
                To Shopping List
              </span>
            </li>
            <li>
              <Link
                to={`/recipes/edit/${currentRecipe.id}`}
                className="dropdown-item"
                onClick={handleEdit}
              >
                Edit Recipe
              </Link>
            </li>
            <li>
              <span className="dropdown-item" onClick={handleDelete}>
                Delete Recipe
              </span>
            </li>
          </ul>

          <p>{currentRecipe.description}</p>

          <div className="ingredients">
            {currentRecipe ? currentRecipe.ingredients.map((ingredientItem:Ingredients) => {
              return (
                <div className="ingredients-item" key={ingredientItem.id}>
                  <span>{ingredientItem.ingredientName}</span> <span>-</span>{" "}
                  <span>{ingredientItem.quantity}</span>
                </div>
              );
            }):null}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default RecipeDetail;
