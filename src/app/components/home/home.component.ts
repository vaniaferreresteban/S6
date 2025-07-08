import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { startWith } from 'rxjs';

import { Budget } from '../../interfaces/budget';
import { PanelComponent } from '../panel/panel.component';
import { BudgetListComponent } from '../budget-list/budget-list.component';
import { BudgetService } from '../../services/budget.service';

interface BudgetFormValue {
  selected: boolean;
  options?: Record<string, number>;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PanelComponent,
    MatCheckboxModule,
    BudgetListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public budgets = signal<Budget[]>([]);
  private budgetService = inject(BudgetService);
  private formBuilder = inject(FormBuilder);

  public budgetsForm: FormGroup = this.formBuilder.group({
    budgetsFormArray: this.formBuilder.array([]),
  });

  public clientForm: FormGroup = this.formBuilder.group({
    name: [''],
    telephone: [''],
    email: [''],
  });

  private formValues = toSignal(
    this.budgetsForm.valueChanges.pipe(startWith(this.budgetsForm.value))
  );

  public totalBudget = computed(() => {
    const staticBudgets = this.budgets();
    const formValues = this.formValues()?.budgetsFormArray ?? [];
    if (staticBudgets.length === 0 || formValues.length === 0) return 0;

    const combinedData = formValues.map(
      (formValue: BudgetFormValue, index: number) => ({
        ...staticBudgets[index],
        ...formValue,
      })
    );
    return this.budgetService.getTotalBudget(combinedData);
  });

  ngOnInit(): void {
    const budgetsData = this.budgetService.getBudgets();
    this.budgets.set(budgetsData);
    this.buildBudgetsForm(budgetsData);
  }

  buildBudgetsForm(budgets: Budget[]): void {
    const formArray = this.budgetsForm.get('budgetsFormArray') as FormArray;
    formArray.clear();
    budgets.forEach((budget) => {
      const formControlsConfig: Record<string, unknown> = {
        selected: [false],
      };

      if (budget.options) {
        const panelGroup: Record<string, unknown> = {};
        budget.options.forEach((opt) => {
          panelGroup[opt.name] = [1];
        });
        formControlsConfig['options'] = this.formBuilder.group(panelGroup);
      }
      formArray.push(this.formBuilder.group(formControlsConfig));
    });
  }

  public createClient() {
    if (this.clientForm.invalid || this.totalBudget() === 0) {
      alert(
        'Debes rellenar los datos del cliente y seleccionar al menos un servicio.'
      );
      return;
    }

    const clientData = JSON.parse(JSON.stringify(this.clientForm.value));
    const staticBudgets = this.budgets();
    const formValues = this.formValues()?.budgetsFormArray ?? [];
    const combinedData = formValues.map(
      (formValue: BudgetFormValue, index: number) => ({
        ...staticBudgets[index],
        ...formValue,
      })
    );
    clientData.budgets = combinedData.filter((b: Budget) => b.selected);
    clientData.totalPrice = this.totalBudget();
    this.budgetService.updateClientBudgets(clientData);

    this.clientForm.reset();
    this.budgetsForm.reset();
  }

  get budgetsFormArray(): FormArray {
    return this.budgetsForm.get('budgetsFormArray') as FormArray;
  }

  public getAsFormGroup(control: AbstractControl | null): FormGroup {
    return control as FormGroup;
  }
}