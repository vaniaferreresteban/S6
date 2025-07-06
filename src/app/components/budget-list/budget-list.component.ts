import { Component, inject } from '@angular/core';
import { KeyValuePipe } from '@angular/common';

import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [KeyValuePipe],
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss'],
})
export class BudgetListComponent {
  public budgetService = inject(BudgetService);
}
