import { Component, inject, OnInit } from '@angular/core';
import { WelcomeComponent } from '../../shared/welcome/welcome.component';
import { BudgetListComponent } from '../budget-list/budget-list.component';
import { BudgetService } from '../../services/budget.service';
import { Budget } from '../../interfaces/budget';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WelcomeComponent, BudgetListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  budgets: Budget[] = [];
  private budgetService = inject(BudgetService);
  ngOnInit(): void {
    this.budgets = this.budgetService.getBudgets();
  }
}
