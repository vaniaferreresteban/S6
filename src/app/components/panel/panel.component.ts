import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { BudgetOptions } from '../../interfaces/budgetOptions';

@Component({
  selector: 'app-panel',
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent {
  public options = input.required<BudgetOptions[]>();
  public panelForm = input.required<FormGroup>();
  
}
