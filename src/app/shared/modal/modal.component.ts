import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

import { BudgetOptions } from '../../interfaces/budgetOptions';
/**
 * @title Dialog elements
 */
@Component({
  selector: 'app-modal',
  templateUrl: 'modal.Component.html',
  standalone: true,
  imports: [MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {

  @Input() option!: BudgetOptions;

  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(OpenDialog, { data: this.option });
  }
}

@Component({
  selector: 'app-open-dialog',
  template: `<h2 mat-dialog-title>{{option.name}}</h2>
<mat-dialog-content>{{option.info}}</mat-dialog-content>
<mat-dialog-actions>
  <button matButton mat-dialog-close>Tancar</button>
</mat-dialog-actions>
`,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenDialog {
  option = inject<BudgetOptions>(MAT_DIALOG_DATA);
}