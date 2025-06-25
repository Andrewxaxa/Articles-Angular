import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Input } from './input';
import { FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComponentRef } from '@angular/core';

describe('Input component', () => {
  let fixture: ComponentFixture<Input>;
  let component: Input;
  let componentRef: ComponentRef<Input>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Input],
    }).compileComponents();

    fixture = TestBed.createComponent(Input);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  it('should display label with name', () => {
    componentRef.setInput('name', 'Username');
    componentRef.setInput('control', new FormControl(''));
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('mat-label')).nativeElement;
    expect(label.textContent).toContain('Username');
  });

  it('should bind control value to input', () => {
    componentRef.setInput('name', 'Username');
    componentRef.setInput('control', new FormControl('test value'));
    fixture.detectChanges();

    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputEl.value).toBe('test value');
  });

  it('should show required error message when control has required error', () => {
    const control = new FormControl('', { validators: Validators.required });
    componentRef.setInput('name', 'Email');
    componentRef.setInput('control', control);
    control.markAsTouched();
    control.updateValueAndValidity();
    fixture.detectChanges();

    const errorEl = fixture.debugElement.query(
      By.css('mat-error')
    ).nativeElement;
    expect(errorEl.textContent).toContain('Email is required');
  });

  it('should show minlength error message when control has minlength error', () => {
    const control = new FormControl('a', {
      validators: Validators.minLength(3),
    });
    componentRef.setInput('name', 'Password');
    componentRef.setInput('control', control);
    control.markAsTouched();
    control.updateValueAndValidity();
    fixture.detectChanges();

    const errorEl = fixture.debugElement.query(
      By.css('mat-error')
    ).nativeElement;
    expect(errorEl.textContent).toContain('Password is too short');
  });

  it('should use default input type "text"', () => {
    componentRef.setInput('name', 'Name');
    componentRef.setInput('control', new FormControl(''));
    fixture.detectChanges();

    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputEl.getAttribute('type')).toBe('text');
  });

  it('should respect custom input type if provided', () => {
    componentRef.setInput('name', 'Username');
    componentRef.setInput('control', new FormControl(''));
    componentRef.setInput('type', 'password');
    fixture.detectChanges();

    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputEl.getAttribute('type')).toBe('password');
  });
});
