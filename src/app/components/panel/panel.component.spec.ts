import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, forwardRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  FormGroup,
  FormControl,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';

import { PanelComponent } from './panel.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { BudgetOptions } from '../../interfaces/budgetOptions';
import { NumInputComponent } from '../../shared/num-input/num-input.component';

@Component({
  selector: 'app-num-input',
  standalone: true,
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MockNumInputComponent),
      multi: true,
    },
  ],
})
class MockNumInputComponent implements ControlValueAccessor {
  @Input() min = '';
  @Input() formControlName = '';

  writeValue(_obj: any): void {
    //placeholder
  }
  registerOnChange(_fn: any): void {
    //placeholder
  }
  registerOnTouched(_fn: any): void {
    //placeholder
  }
}

@Component({
  selector: 'app-modal',
  standalone: true,
  template: '',
})
class MockModalComponent {
  @Input() option: BudgetOptions | null = null;
}
describe('PanelComponent Unit Test', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  /*  {
      name: 'SEO',
      price: 300,
      description: "Programació d'una pagina web completa",
    },
    {
      name: 'ADS',
      price: 400,
      description: "Programació d'una pagina web completa",
    },
    {
      name: 'WEB',
      price: 500,
      description: "Programació d'una pagina web completa",
      options: [
        {
          name: 'Pàgines',
          price: 30,
          info: `Afegeix les pàgines que tindrà el teu projecte.
          
          El cost de cada pàgina es de 30€`,
        },
        {
          name: 'Llengues',
          price: 30,
          info: `Afegeix els llenguatges que tindrà el teu projecte.
          
          El cost de cada llengua es de 30€`,
        },
      ],
    },
  ];*/
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelComponent],
    })
      .overrideComponent(PanelComponent, {
        remove: { imports: [NumInputComponent, ModalComponent] },
        add: { imports: [MockNumInputComponent, MockModalComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('options', []);
    fixture.componentRef.setInput('panelForm', new FormGroup({}));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
  it('should pass correct properties to child components', () => {
    const mockOptions: BudgetOptions[] = [
      { name: 'Pàgines', price: 30, info: 'Info' },
    ];
    const mockForm = new FormGroup({
      Pàgines: new FormControl(1),
    });

    fixture.componentRef.setInput('options', mockOptions);
    fixture.componentRef.setInput('panelForm', mockForm);
    fixture.detectChanges();

    const modalDebugElement = fixture.debugElement.query(By.css('app-modal'));
    const numInputDebugElement = fixture.debugElement.query(
      By.css('app-num-input'),
    );

    const modalInstance =
      modalDebugElement.componentInstance as MockModalComponent;
    const numInputInstance =
      numInputDebugElement.componentInstance as MockNumInputComponent;

    expect(modalInstance.option).toEqual(mockOptions[0]);
    expect(numInputInstance.formControlName).toBe('Pàgines');
  });
});
