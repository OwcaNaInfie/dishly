import { Recipe } from './Recipe';

export interface User {
  id: string;
  uid: string;
  username: string;
  password: string;
  name: string;
  displayName: string;
  photoURL: string;
  surname: string;
  bio: string;
  email: string;
  telephone: string;
  myRecipes: Recipe[];
}