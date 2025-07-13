import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { startWith } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { Budget } from '../../../budgets/models/budget';
import { PanelComponent } from '../panel/panel.component';
import { BudgetListComponent } from '../budget-list/budget-list.component';
import { BudgetService } from '../../../budgets/services/budget.service';

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
  private route = inject(ActivatedRoute);

  public budgetsForm: FormGroup = this.formBuilder.group({
    budgetsFormArray: this.formBuilder.array([]),
  });

  public clientForm: FormGroup = this.formBuilder.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$'),
      ],
    ],

    telephone: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
    email: ['', [Validators.required, Validators.email]],
  });

  private formValues$ = toSignal(
    this.budgetsForm.valueChanges.pipe(startWith(this.budgetsForm.value)),
  );

  public totalBudget = computed(() => {
    const staticBudgets = this.budgets();
    const formValues = this.formValues$()?.budgetsFormArray ?? [];
    if (staticBudgets.length === 0 || formValues.length === 0) return 0;

    const combinedData = formValues.map(
      (formValue: BudgetFormValue, index: number) => ({
        ...staticBudgets[index],
        ...formValue,
      }),
    );
    return this.budgetService.getTotalBudget(combinedData);
  });

  ngOnInit(): void {
    const budgetsData = this.budgetService.getBudgets();
    this.budgets.set(budgetsData);
    this.buildBudgetsForm(budgetsData);
    this.route.queryParamMap.subscribe((params) => {
      const encodedData = params.get('data');

      if (encodedData) {
        try {
          const jsonString = atob(encodedData);
          const budgetsFromUrl = JSON.parse(jsonString) as Budget[];
          this.populateFormFromData(budgetsFromUrl);
        } catch (error) {
          console.error('Error en processar les dades de la URL:', error);
        }
      }
    });
  }
  private populateFormFromData(budgetsFromUrl: Budget[]): void {
    const formArray = this.budgetsForm.get('budgetsFormArray') as FormArray;

    budgetsFromUrl.forEach((budgetUrl) => {
      const formGroup = formArray.controls.find((control) => {
        const budgetOriginal = this.budgets().find(
          (b) => b.name === budgetUrl.name,
        );
        const index = this.budgets().indexOf(budgetOriginal!);
        return formArray.controls.indexOf(control) === index;
      }) as FormGroup;

      if (formGroup) {
        formGroup.patchValue({
          selected: budgetUrl.selected,
          options: budgetUrl.options,
        });
      }
    });
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
        budget.options.forEach((option) => {
          panelGroup[option.name] = [1];
        });
        formControlsConfig['options'] = this.formBuilder.group(panelGroup);
      }
      formArray.push(this.formBuilder.group(formControlsConfig));
    });
  }

  public createClient() {
    if (this.clientForm.invalid || this.totalBudget() === 0) {
      alert(
        "Has d'omplir les dades de client i afegir un pressupost per a continuar.",
      );
      return;
    }

    const clientData = JSON.parse(JSON.stringify(this.clientForm.value));
    const staticBudgets = this.budgets();
    const formValues = this.formValues$()?.budgetsFormArray ?? [];
    const combinedData = formValues.map(
      (formValue: BudgetFormValue, index: number) => ({
        ...staticBudgets[index],
        ...formValue,
      }),
    );
    clientData.budgets = combinedData.filter((b: Budget) => b.selected);
    clientData.totalPrice = this.totalBudget();
    this.budgetService.addClientBudget(clientData);

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
