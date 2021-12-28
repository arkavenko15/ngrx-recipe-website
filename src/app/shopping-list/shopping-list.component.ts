import { RecipeService } from "./../services/recipe.service";
import { Ingredient } from "./../shared/ingredient.model";
import { ShoppingListService } from "./../services/shopping-list.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  //private changeIngredientsSubs: Subscription;
  public ingredients: Observable<{ingredients: Ingredient[]}>

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
  ) {}

  public ngOnInit(): void {

    this.ingredients = this.store.select('shoppingList')
    console.log(this.ingredients);

    //this.ingredients = this.shoppingListService.getIngredients();
    // this.changeIngredientsSubs =
    //   this.shoppingListService.ingredientsChanged.subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   );
  }

  public ngOnDestroy(): void {
    //this.changeIngredientsSubs.unsubscribe();
  }

  public onEditItem(index: number): void {
    this.shoppingListService.startedEditing.next(index);
  }
}
