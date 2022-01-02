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

interface ShoppingListProps {
  ingredeinList: Array<Ingredients>;
  setIngredeinList: (e: Array<Ingredients>) => void;
  recipeList: Array<RecipesForm>;
  setRecipeList: (e: Array<RecipesForm>) => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({
  ingredeinList,
  setIngredeinList,
  recipeList,
  setRecipeList,
}) => {
  const [ingredient, setIngredient] = useState<Ingredients>({
    id: genid(),
    ingredientName: "",
    quantity: "",
  });

  const [toggleDisabled, setToggleDisabled] = useState(true);
  const [toggleDisplay, setToggleDisplay] = useState(false);

  useEffect(() => {
    recipeList.map((recipe) => {
      let ingredientsArr = recipe.ingredients;
      for (let item of ingredientsArr) {
        if (!ingredeinList.some((a) => a.id === item.id)) {
          ingredeinList.push(item);
        }
      }
      return ingredeinList;
    });
  }, []);

  // handle change form field name
  const handleFormChange = (fieldName: string, value: string) => {
    setIngredient({ ...ingredient, [fieldName]: value });
  };

  // handle submit form to push ingredient into lst
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newIngredient = {
      id: genid(),
      ingredientName: ingredient.ingredientName,
      quantity: ingredient.quantity,
    };
    setIngredeinList([...ingredeinList, newIngredient]);
    handleClear();
  };

  // handle clear input value
  const handleClear = () => {
    setIngredient({ ...ingredient, ingredientName: "", quantity: "" });
  };

  // useEffect to change toggle disabled button
  useEffect(() => {
    if (ingredient.ingredientName && ingredient.quantity)
      setToggleDisabled(false);
    if (!ingredient.ingredientName || !ingredient.quantity)
      setToggleDisabled(true);
    if (!ingredient.id) {
      setToggleDisplay(false);
    } else {
      setToggleDisplay(true);
    }
  }, [ingredient]);

  const handleOnClick = (ingredient: Ingredients) => {
    setIngredient(ingredient);
  };

  const handleDelete = (id: string) => {
    setIngredeinList(ingredeinList.filter((item) => item.id !== id));
    setIngredient({ ...ingredient, id: "" });
    handleClear();
  };

  const handleUpdate = (item: Ingredients) => {
    ingredeinList.map((rec, index) => {
      if (rec.id === item.id) {
        ingredeinList[index] = item;
      }
      return ingredeinList;
    });
    setIngredeinList([...ingredeinList]);
    setIngredient({ ...ingredient, id: "" });
    handleClear();
  };

  return (
    <div className="container-fluid mt-4 shopping-list">
      <div className="shopping-list-top ">
        <form onSubmit={handleSubmit}>
          <div className="d-flex">
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control shopping-list-top-name"
                id="Name"
                value={ingredient?.ingredientName}
                onChange={(e) =>
                  handleFormChange("ingredientName", e.target.value)
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Amount
              </label>
              <input
                type="number"
                className="form-control shopping-list-top-quantity"
                id="quantity"
                value={ingredient?.quantity}
                onChange={(e) => handleFormChange("quantity", e.target.value)}
              />
            </div>
          </div>
          {toggleDisplay ? (
            <div className="d-flex">
              <button
                className="btn btn-success"
                disabled={toggleDisabled}
                type="submit"
              >
                Add
              </button>
              <button type="button" className="btn btn-primary">
                Clear
              </button>
            </div>
          ) : (
            <div className="d-flex d-none">
              <button
                className="btn btn-success"
                type="submit"
                onClick={() => handleUpdate(ingredient)}
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(ingredient.id)}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          )}

          <hr />
        </form>

        <div className="ingredients">
          {ingredeinList.map((ingredientItem) => {
            return (
              <div
                className="ingredients-item"
                key={ingredientItem.id}
                onClick={() => {
                  handleOnClick(ingredientItem);
                }}
              >
                <span>{ingredientItem.ingredientName}</span> <span>-</span>{" "}
                <span>{ingredientItem.quantity}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;

