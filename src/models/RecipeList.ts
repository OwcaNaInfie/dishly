import { Recipe } from './Recipe';

export class RecipeList {
  private static instance: RecipeList;
  recipes: Recipe[] = [];

  private constructor() {}

  public static getInstance(): RecipeList {
    if (!RecipeList.instance) {
      RecipeList.instance = new RecipeList();
    }
    return RecipeList.instance;
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  getRecipes() {
    return this.recipes;
  }
}
