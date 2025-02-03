export enum ProductUnit {
  GRAM = "g",
  PIECE = "szt."
}

export interface Product {
  name: string;
	amount: number;
	unit: ProductUnit;
}