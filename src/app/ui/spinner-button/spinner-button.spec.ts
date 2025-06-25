import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerButton } from './spinner-button';
import { ComponentRef } from '@angular/core';

describe('SpinnerButton', () => {
  let component: SpinnerButton;
  let fixture: ComponentFixture<SpinnerButton>;
  let componentRef: ComponentRef<SpinnerButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerButton, MatButtonModule, MatProgressSpinnerModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerButton);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('text', 'Click me');
    componentRef.setInput('color', 'primary');
    componentRef.setInput('isLoading', false);
    componentRef.setInput('disabled', false);
    componentRef.setInput('type', 'submit');

    fixture.detectChanges();
  });

  it('should display the text input', () => {
    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonEl.textContent?.trim()).toBe('Click me');
  });

  it('should show mat-spinner when isLoading is true', () => {
    componentRef.setInput('isLoading', true);
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinner).toBeTruthy();

    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonEl.textContent).toContain('Click me');
  });

  it('should NOT show mat-spinner when isLoading is false', () => {
    componentRef.setInput('isLoading', false);
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinner).toBeFalsy();
  });
});
