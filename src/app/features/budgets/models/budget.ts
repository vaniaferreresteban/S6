import { BudgetOptions } from './budgetOptions';

export interface Budget {
  name: string;
  description: string;
  price: number;
  options?: BudgetOptions[];
  selected?:boolean;
}
