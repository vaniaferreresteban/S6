import { Budget } from './budget';

export interface Client {
  name: string;
  telephone: number;
  email: string;
  totalPrice:number;
  budgets: Budget[];
}
