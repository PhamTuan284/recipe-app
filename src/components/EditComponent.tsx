import {
  BrowserRouter as Router,
  Link,
  useHistory,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { genid } from "../utilities/genid";

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

interface EditComponent {
  recipeList: Array<RecipesForm>;
  setRecipeList: (e:Array<RecipesForm>) => void;
  currentRecipe: RecipesForm;
  setCurrentRecipe: (e:RecipesForm) => void
}

const EditComponent: React.FC<EditComponent> = ({
  recipeList,
  setRecipeList,
  currentRecipe,
  setCurrentRecipe
}) => {
  const { currentRecipeId } = useParams<{currentRecipeId:string}>();


  useEffect(() => {
    setCurrentRecipe(
      recipeList.filter((recipeItem) => {
        return recipeItem.id === currentRecipeId;
      })[0]
    );
  });

  const [recipeForm, setRecipeForm] = useState<RecipesForm>(currentRecipe);

  const [errors, setErrors] = useState({
    name: "",
    imageUrl: "",
    description: "",
  });

  const [formValid, setFormValid] = useState(false);
  const [ingredient, setIngredient] = useState<Ingredients>({
    id: "",
    ingredientName: "",
    quantity: "",
  });

  let history = useHistory();

  function validate() {
    if (!recipeForm.name) {
      errors.name = "Name is required!";
    }

    if (!recipeForm.imageUrl) {
      errors.imageUrl = "Image's URL is required!";
    }
    if (!recipeForm.description) {
      errors.description = "Description is required!";
    }

    setErrors(errors);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validate();
    let cloneRecipeList = [...recipeList];

    cloneRecipeList.map((recipeItem,index) => {
      if (recipeItem.id === currentRecipe.id) {
         recipeItem = recipeForm
      }
      cloneRecipeList[index] = recipeItem
      return recipeItem;
    });
    
    setRecipeList(cloneRecipeList);
    history.push("/recipes");
  }

  function handleAddIngredient() {
    const newIngredient = [
      ...recipeForm.ingredients,
      { id: genid(), ingredientName: "", quantity: "" },
    ];
    setRecipeForm({
      ...recipeForm,
      ingredients: newIngredient,
    });
  }

  function handleFormChange(fieldName: string, value: string) {
    setRecipeForm({
      ...recipeForm,
      [fieldName]: value,
    });
  }

  function handleUpdateIngredient(ingredient: Ingredients) {
    const ingredientList = recipeForm.ingredients.map((item) => {
      if (item.id === ingredient.id) return ingredient;
      return item;
    });

    setRecipeForm({ ...recipeForm, ingredients: [...ingredientList] });
  }

  function handleDeleteIngredient(id: string) {
    let ingredientList = recipeForm.ingredients.filter((ingredientItem) => {
      return ingredientItem.id !== id;
    });
    setRecipeForm({ ...recipeForm, ingredients: [...ingredientList] });
  }

  useEffect(() => {
    if (recipeForm.name && recipeForm.imageUrl && recipeForm.description) {
      setFormValid(true);
      recipeForm.ingredients.map((ingredientItem) => {
        if (!ingredientItem.ingredientName && !ingredientItem.quantity) {
          setFormValid(true);
        }
      });
    } else setFormValid(false);
  }, [recipeForm]);

  useEffect(() => {
    if (ingredient.ingredientName !== "") handleUpdateIngredient(ingredient);
  }, [ingredient]);

  return (
    <div className="form-component">
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="btn btn-success"
          disabled={!formValid ? true : false}
        >
          Save
        </button>

        <Link to="/recipes">
          <button type="button" className="btn btn-danger">
            Cancel
          </button>
        </Link>

        <div className="mb-3 mt-1">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
            value={recipeForm.name}
            onChange={(e) => {
              handleFormChange("name", e.target.value);
            }}
          />
          {/* {errors.name ? <p className="text-danger">{errors.name}</p> : null} */}
        </div>

        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            className="form-control"
            id="imageUrl"
            placeholder="URL"
            value={recipeForm.imageUrl}
            onChange={(e) => {
              handleFormChange("imageUrl", e.target.value);
            }}
          />
          {/* {errors.imageUrl ? (
            <p className="text-danger">{errors.imageUrl}</p>
          ) : null} */}

          <img src={recipeForm.imageUrl} alt="" className="mt-2" />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows={3}
            placeholder="Description"
            value={recipeForm.description}
            onChange={(e) => {
              handleFormChange("description", e.target.value);
            }}
          />
          {/* {errors.description ? (
            <p className="text-danger">{errors.description}</p>
          ) : null} */}
        </div>

        <div className="ingredient">
          {recipeForm
            ? recipeForm.ingredients.map((currentIngredientItem, index) => (
                <div className="d-flex mb-4" key={index}>
                  <input
                    type="text"
                    className="form-control ingredient-input"
                    value={currentIngredientItem.ingredientName}
                    onChange={(e) =>
                      setIngredient({
                        ...currentIngredientItem,
                        ingredientName: e.target.value,
                      })
                    }
                  />

                  <input
                    type="number"
                    className="form-control ingredient-quantity"
                    value={currentIngredientItem.quantity}
                    onChange={(e) =>
                      setIngredient({
                        ...currentIngredientItem,
                        quantity: e.target.value,
                      })
                    }
                  />
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() =>
                      handleDeleteIngredient(currentIngredientItem.id)
                    }
                  >
                    X
                  </button>
                </div>
              ))
            : null}
        </div>

        <hr />

        <button
          type="button"
          className="btn btn-success"
          onClick={handleAddIngredient}
        >
          Add Ingredient
        </button>
      </form>
    </div>
  );
};

export default EditComponent;
