import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Textarea } from './textarea';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComponentRef } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

describe('Textarea component', () => {
  let fixture: ComponentFixture<Textarea>;
  let componentRef: ComponentRef<Textarea>;
  let control: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Textarea, ReactiveFormsModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Textarea);
    componentRef = fixture.componentRef;

    control = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]);

    componentRef.setInput('name', 'Description');
    componentRef.setInput('control', control);
    componentRef.setInput('minRows', 4);

    fixture.detectChanges();
  });

  it('should display label from name input', () => {
    const labelEl = fixture.debugElement.query(
      By.css('mat-label')
    ).nativeElement;
    expect(labelEl.textContent).toContain('Description');
  });

  it('should bind control value to textarea', () => {
    control.setValue('Test description');
    fixture.detectChanges();

    const textareaEl = fixture.debugElement.query(
      By.css('textarea')
    ).nativeElement;
    expect(textareaEl.value).toBe('Test description');
  });

  it('should use minRows input as cdkAutosizeMinRows', () => {
    const directiveInstance = fixture.debugElement
      .query(By.directive(CdkTextareaAutosize))
      .injector.get(CdkTextareaAutosize);
    expect(directiveInstance.minRows).toBe(4);
  });

  it('should display required error when control is empty and touched', () => {
    control.markAsTouched();
    control.updateValueAndValidity();
    fixture.detectChanges();

    const errorEl = fixture.debugElement.query(
      By.css('mat-error')
    ).nativeElement;
    expect(errorEl.textContent).toContain('Description is required');
  });

  it('should display minlength error when value is too short', () => {
    control.setValue('abc');
    control.markAsTouched();
    control.updateValueAndValidity();
    fixture.detectChanges();

    const errorEl = fixture.debugElement.query(
      By.css('mat-error')
    ).nativeElement;
    expect(errorEl.textContent).toContain('Description is too short');
  });
});
