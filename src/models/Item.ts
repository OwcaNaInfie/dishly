export class Item {
  id: number;
  name: string;
  protein: number;
  carbs: number;
  fat: number;

  constructor(id: number, name: string, protein: number, carbs: number, fat: number) {
    this.id = id;
    this.name = name;
    this.protein = protein;
    this.carbs = carbs;
    this.fat = fat;
  }
}
