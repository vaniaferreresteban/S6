import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumInputComponent } from './num-input.component';

describe('NumInputComponent', () => {
  let component: NumInputComponent;
  let fixture: ComponentFixture<NumInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NumInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display the initial value set by writeValue', () => {
    component.writeValue(5);
    fixture.detectChanges(); 

    const inputElement = fixture.nativeElement.querySelector('.counter-value');

    expect(inputElement.value).toBe('5');
    expect(component.quantity()).toBe(5);
  });
  it('should increment value and call onChange on button click', () => {
    spyOn(component, 'onChange');

    const incrementButton =
      fixture.nativeElement.querySelectorAll('.counter-button')[1];

    incrementButton.click();
    fixture.detectChanges();

    expect(component.quantity()).toBe(2);
    expect(component.onChange).toHaveBeenCalledWith(2);
  });

  it('should decrement value and call onChange on button click', () => {
    component.writeValue(3);
    fixture.detectChanges();

    spyOn(component, 'onChange');

    const decrementButton =
      fixture.nativeElement.querySelectorAll('.counter-button')[0];

    decrementButton.click();
    fixture.detectChanges();

    expect(component.quantity()).toBe(2);
    expect(component.onChange).toHaveBeenCalledWith(2);
  });
});
