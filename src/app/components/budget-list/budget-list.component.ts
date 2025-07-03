import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { startWith } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { Budget } from '../../interfaces/budget';
import { PanelComponent } from '../panel/panel.component';

import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [ReactiveFormsModule, PanelComponent, MatCheckboxModule],
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss'],
})
export class BudgetListComponent implements OnInit {
  public budgets = signal<Budget[]>([]);
  private budgetService = inject(BudgetService);

  private formBuilder = inject(FormBuilder);

  public budgetsForm: FormGroup = this.formBuilder.group({
    budgetsFormArray: this.formBuilder.array([]),
  });

  get budgetsFormArray(): FormArray {
    return this.budgetsForm.get('budgetsFormArray') as FormArray;
  }

  private formValue$ = this.budgetsForm.valueChanges.pipe(
    startWith(this.budgetsForm.value),
  );
  private formValueSignal = toSignal(this.formValue$);

  public totalBudget = computed(() => {
    const formBudgets = this.formValueSignal()?.budgetsFormArray ?? [];
    return this.budgetService.getTotalBudget(formBudgets);


  });

  constructor() {
    effect(() => {
      const currentBudgets = this.budgets();
      this.budgetsFormArray.clear();

      currentBudgets.forEach((budget) => {
        const formControlsConfig: Record<string, unknown[] | FormGroup> = {
          name: [budget.name],
          price: [budget.price],
          description: [budget.description],
          selected: [false],
        };

        if (budget.options && budget.options.length > 0) {
          const panelControlsConfig: Record<string, unknown[]> = {};
          for (const option of budget.options) {
            panelControlsConfig[option.name] = [1];
          }
          const panelGroup = this.formBuilder.group(panelControlsConfig);
          formControlsConfig['options'] = panelGroup;
        }

        this.budgetsFormArray.push(this.formBuilder.group(formControlsConfig));
      });
    });
  }
  public getAsFormGroup(control: AbstractControl | null): FormGroup {
    return control as FormGroup;
  }
  ngOnInit(): void {
    this.budgets.set(this.budgetService.getBudgets());
  }
}
