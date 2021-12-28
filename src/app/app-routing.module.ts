import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const appRoutes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {path:'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
  {path:'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'}
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
