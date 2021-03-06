import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.action"

const initialState = {
  ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
};
export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListAction) {

  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      }
    default:
      return state;
  }
}
