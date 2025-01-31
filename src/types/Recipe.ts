export interface Recipe {
  id: string;
  title: string;
  preparationTime: number;
  instructions: string;
  category: string;
  isRestricted: boolean;
  description: string;
}
