import { Injectable } from '@angular/core';
import { Budget } from '../interfaces/budget';
import { Client } from '../interfaces/client';
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
      options: [
        {
          name: 'Pàgines',
          price: 30,
          info: `Afegeix les pàgines que tindrà el teu projecte.
          
          El cost de cada pàgina es de 30€`,
        },
        {
          name: 'Llengues',
          price: 30,
          info: `Afegeix els llenguatges que tindrà el teu projecte.
          
          El cost de cada llengua es de 30€`,
        },
      ],
    },
  ];
  private clientBudgets: Client[] = [];
  updateClientBudgets(client: Client): void {
    this.clientBudgets.push(client);
    console.log(this.clientBudgets);
  }
  getBudgets(): Budget[] {
    return this._budgets;
  }
  getTotalBudget(formBudgets: Budget[]): number {
    return formBudgets.reduce((acc: number, curr: Budget): number => {
      if (!curr.selected) {
        return acc;
      }
      let budgetPrice = curr.price;
      if (curr.options) {
        const originalBudget: Budget | undefined = this._budgets.find(
          (b) => b.name === curr.name,
        );

        let optionMultiplier = 0;
        console.log(optionMultiplier, originalBudget, curr);
        let i = 0;
        if (!originalBudget) {
          return budgetPrice;
        }
        for (const optionKey in curr.options) {
          optionMultiplier += Number(
            originalBudget!.options![i].price * Number(curr.options[optionKey]),
          );

          i++;
        }
        budgetPrice += optionMultiplier;
      }
      return acc + budgetPrice;
    }, 0);
  }
}
