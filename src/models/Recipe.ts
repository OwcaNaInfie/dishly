import { Product } from "./Product";

export enum RecipeCategory {
  BREAKFAST = "śniadanie",
  LUNCH = "lunch",
  DINNER = "obiad",
  SUPPER = "kolacja",
  DESSERT = "deser"
}

export interface Recipe {
  id: string;
  authorId: string;
  name: string;
  description: string;
  shoppingList: Product[];
  preparationTime: string;
  instructions: string;
  category: RecipeCategory;
  isRestricted: boolean;
}
