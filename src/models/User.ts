import { Recipe } from './Recipe';

export enum UserGender {
  MALE = "męszczyzna",
  FEMALE = "kobieta"
}
export interface User {
  id: string;
  uid: string;
  username: string;
  password: string;
  name: string;
  displayName: string;
  photoURL: string;
  surname: string;
  gender: UserGender;
  bio: string;
  email: string;
  telephone: string;
  myRecipes: Recipe[];
}