import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Select } from './select';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatSelect } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Select component', () => {
  let fixture: ComponentFixture<Select>;
  let componentRef: ComponentRef<Select>;
  let control: FormControl;

  const optionsMock = [
    { key: '1', label: 'Option 1', value: 'opt1' },
    { key: '2', label: 'Option 2', value: 'opt2' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Select, ReactiveFormsModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Select);
    componentRef = fixture.componentRef;

    control = new FormControl('', Validators.required);

    componentRef.setInput('name', 'Category');
    componentRef.setInput('options', optionsMock);
    componentRef.setInput('control', control);

    fixture.detectChanges();
  });

  it('should render label from name input', () => {
    const labelEl = fixture.debugElement.query(
      By.css('mat-label')
    ).nativeElement;
    expect(labelEl.textContent).toContain('Category');
  });

  it('should render all options in the dropdown', async () => {
    const selectTrigger = fixture.debugElement.query(
      By.css('mat-select')
    ).nativeElement;
    selectTrigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const options = document.querySelectorAll('mat-option');
    expect(options.length).toBe(2);
    expect(options[0].textContent?.trim()).toBe('Option 1');
    expect(options[1].textContent?.trim()).toBe('Option 2');
  });

  it('should display required error message', () => {
    control.markAsTouched();
    control.updateValueAndValidity();
    fixture.detectChanges();

    const errorEl = fixture.debugElement.query(
      By.css('mat-error')
    ).nativeElement;
    expect(errorEl.textContent).toContain('Category is required');
  });

  it('should bind control value to selected option', async () => {
    control.setValue('opt2');
    fixture.detectChanges();
    await fixture.whenStable();

    const selectComponent = fixture.debugElement.query(By.directive(MatSelect))
      .componentInstance as MatSelect;
    expect(selectComponent.value).toBe('opt2');
  });
});
