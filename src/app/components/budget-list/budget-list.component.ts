import { Component, computed, effect, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { startWith } from 'rxjs';

import { Budget } from '../../interfaces/budget';
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [ReactiveFormsModule, PanelComponent],
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss'],
})
export class BudgetListComponent {
  public budgets = input.required<Budget[]>();
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
    const originalBudgets = this.budgets();

    return formBudgets.reduce((acc: number, curr: Budget) => {
      if (!curr.selected) {
        return acc;
      }
      let budgetPrice = curr.price;

      if (curr.options) {
        const originalBudget = originalBudgets.find(
          (b) => b.name === curr.name,
        );
        if (originalBudget && originalBudget.options) {
          for (const optionKey in curr.options) {
            const quantity = curr.options[optionKey]; 
            const originalOption = originalBudget.options.find(
              (opt) => opt.name === optionKey,
            );

            if (originalOption) {
              budgetPrice += (Number(quantity)-1) * originalOption.price;
            }
          }
        }
      }
      return acc + budgetPrice;
    }, 0);
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
}
