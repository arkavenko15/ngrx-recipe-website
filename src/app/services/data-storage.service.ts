import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";

import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  public storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    this.http.put(
      "https://recipe-website-aaedf-default-rtdb.firebaseio.com/recipes.json",
      recipes
    );
  }

  public fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        "https://recipe-website-aaedf-default-rtdb.firebaseio.com/recipes.json"
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
