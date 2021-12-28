import { Subject } from "rxjs";
import { Ingredient } from "./../shared/ingredient.model";

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    { name: "bread", amount: 2 },
    { name: "apple", amount: 2 },
    { name: "banana", amount: 2 },
  ];
  public ingredientsChanged = new Subject<Ingredient[]>();
  public startedEditing: Subject<number> = new Subject<number>();

  constructor() {}

  public getIngredients() {
    return this.ingredients.slice();
  }

  public getIngredient(index: number) {
    return this.ingredients[index];
  }

  public addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  public addIngredients(ingredients: Ingredient[]):void {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  public updateIngredient(index, newIngredient): void {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  public deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
