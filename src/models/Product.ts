import { Item } from './Item';

export class Product extends Item {
  quantity: number;
  unit: string;

  constructor(
    id: number,
    name: string,
    protein: number,
    carbs: number,
    fat: number,
    quantity: number,
    unit: string
  ) {
    super(id, name, protein, carbs, fat);
    this.quantity = quantity;
    this.unit = unit;
  }
}
