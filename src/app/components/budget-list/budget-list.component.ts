import { Component, inject } from '@angular/core';
import { KeyValuePipe } from '@angular/common';

import { BudgetService } from '../../services/budget.service';
import { Client } from '../../interfaces/client';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [KeyValuePipe],
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss'],
})
export class BudgetListComponent {
  public budgetService = inject(BudgetService);
  public selectedOrder = this.budgetService.getClientBudgets();
  budgetsCopy = [...this.budgetService.getClientBudgets()];

  public orderByAlphabet() {

    const budgetsCopy = [...this.budgetService.getClientBudgets()];
    this.selectedOrder = budgetsCopy.sort((a: Client, b: Client) => a.name.localeCompare(b.name));
  }
  public orderByPrice() {
    const budgetsCopy = [...this.budgetService.getClientBudgets()];
    this.selectedOrder = budgetsCopy.sort((a: Client, b: Client) => a.totalPrice - b.totalPrice);
  }
  public orderByDate() {
    const budgetsCopy = [...this.budgetService.getClientBudgets()];
    this.selectedOrder = budgetsCopy;
  }


}
