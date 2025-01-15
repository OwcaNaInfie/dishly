import { Product } from './Product';
import { ShoppingList } from './ShoppingList';

export class Recipe {
  id: number;
  authorID: number;
  author: string;
  name: string;
  preparationTime: number;
  ingredients: Product[];
  instructions: string;
  category: string;
  shoppingList: ShoppingList;
  isRestricted: boolean;

  constructor(
    id: number,
    authorID: number,
    author: string,
    name: string,
    preparationTime: number,
    ingredients: Product[],
    instructions: string,
    category: string,
    shoppingList: ShoppingList,
    isRestricted: boolean
  ) {
    this.id = id;
    this.authorID = authorID;
    this.author = author;
    this.name = name;
    this.preparationTime = preparationTime;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.category = category;
    this.shoppingList = shoppingList;
    this.isRestricted = isRestricted;
  }
}
