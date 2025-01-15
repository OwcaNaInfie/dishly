import { Product } from './Product';

export class ShoppingList {
  id: number;
  name: string;
  items: Product[];
  createdAt: string;

  constructor(id: number, name: string, items: Product[], createdAt: string) {
    this.id = id;
    this.name = name;
    this.items = items;
    this.createdAt = createdAt;
  }
}
