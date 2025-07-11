import { Component, inject, signal, computed } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BudgetService } from '../../services/budget.service';
import { Client } from '../../interfaces/client';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [KeyValuePipe, FormsModule],
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss'],
})
export class BudgetListComponent {
  public budgetService = inject(BudgetService);

  public searchTerm = signal<string>('');
  public sortOrder = signal<'date' | 'price' | 'alphabet'>('date');

  async generateUrl(clientBudget: Client): Promise<void> {
    const budgetsData = clientBudget.budgets;
    const jsonString = JSON.stringify(budgetsData);
    const encodedData = btoa(jsonString);

    const baseUrl = window.location.origin;
    const shareableUrl = `${baseUrl}/?data=${encodedData}`;

    try {
      await navigator.clipboard.writeText(shareableUrl);
      alert('Enllaç copiat al porta-retalls! Ja el pots compartir.');
    } catch (err) {
      console.error("No s'ha pogut copiar l'enllaç: ", err);
      alert("Error en copiar l'enllaç. Ves-hi:" + shareableUrl);
    }
  }

  public displayedBudgets = computed(() => {
    const budgets = this.budgetService.clientBudgets$();
    const term = this.searchTerm().toLowerCase();
    const sortBy = this.sortOrder();

    const filtered = term
      ? budgets.filter((budget) => budget.name.toLowerCase().includes(term))
      : budgets;

    const sorted = [...filtered];

    switch (sortBy) {
      case 'alphabet':
        sorted.sort((a: Client, b: Client) => a.name.localeCompare(b.name));
        break;
      case 'price':
        sorted.sort((a: Client, b: Client) => a.totalPrice - b.totalPrice);
        break;
    }
    return sorted;
  });

  public orderByAlphabet() {
    this.sortOrder.set('alphabet');
  }

  public orderByPrice() {
    this.sortOrder.set('price');
  }

  public orderByDate() {
    this.sortOrder.set('date');
  }
}
