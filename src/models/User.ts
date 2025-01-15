import { Recipe } from './Recipe';
import { ShoppingList } from './ShoppingList';

export class User {
  id: number;
  username: string;
  name: string;
  surname: string;
  email: string;
  telephone: string;
  favoriteRecipes: Recipe[];
  myRecipes: Recipe[];
  shoppingLists: ShoppingList[];

  constructor(
    id: number,
    username: string,
    name: string,
    surname: string,
    email: string,
    telephone: string,
    favoriteRecipes: Recipe[],
    myRecipes: Recipe[],
    shoppingLists: ShoppingList[]
  ) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.telephone = telephone;
    this.favoriteRecipes = favoriteRecipes;
    this.myRecipes = myRecipes;
    this.shoppingLists = shoppingLists;
  }
}
