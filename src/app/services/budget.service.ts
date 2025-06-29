import { Injectable } from '@angular/core';
import { Budget } from '../interfaces/budget';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private _budgets: Budget[] = [
    {
      name: 'SEO',
      price: 300,
      description: "Programació d'una pagina web completa",
    },
    {
      name: 'ADS',
      price: 400,
      description: "Programació d'una pagina web completa",
    },
    {
      name: 'WEB',
      price: 500,
      description: "Programació d'una pagina web completa",
      options: [{
        name: 'pages',
        price:30
      },{
        name: 'languages',
        price:30
      }],
    },
  ];
  getBudgets(): Budget[] {
    return this._budgets;
  }
}
