// src/app/services/budget.service.ts

import { Injectable, signal } from '@angular/core';
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

  private clientBudgetsState = signal<Client[]>([]);
  public clientBudgets$ = this.clientBudgetsState.asReadonly();

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
        const originalBudget = this._budgets.find((b) => b.name === curr.name);

        if (originalBudget && originalBudget.options) {
          let optionsTotal = 0;
          for (const optionName in curr.options) {
            const originalOption = originalBudget.options.find(
              (option) => option.name === optionName,
            );

            if (originalOption) {
              const quantity = Number(
                curr.options[optionName as keyof typeof curr.options],
              );
              optionsTotal += originalOption.price * quantity;
            }
          }
          budgetPrice += optionsTotal;
        }
      }
      return acc + budgetPrice;
    }, 0);
  }
  addClientBudget(client: Client): void {
    this.clientBudgetsState.update((currentClients) => [
      ...currentClients,
      client,
    ]);
  }
}
