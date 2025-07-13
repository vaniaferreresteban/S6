import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { BudgetOptions } from '../../../budgets/models/budgetOptions';
import { NumInputComponent } from '../../../../shared/num-input/num-input.component';
import { ModalComponent } from '../../../../shared/modal/modal.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TitleCasePipe,
    NumInputComponent,
    ModalComponent,
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent {
  public options = input.required<BudgetOptions[]>();
  public panelForm = input.required<FormGroup>();
}
