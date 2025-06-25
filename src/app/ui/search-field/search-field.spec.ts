import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchField } from './search-field';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentRef } from '@angular/core';

describe('SearchField component', () => {
  let fixture: ComponentFixture<SearchField>;
  let component: SearchField;
  let componentRef: ComponentRef<SearchField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchField,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchField);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('label', 'Search');
    fixture.detectChanges();
  });

  it('should render input with label', () => {
    const labelEl = fixture.debugElement.query(
      By.css('mat-label')
    ).nativeElement;
    expect(labelEl.textContent).toContain('Search');
  });

  it('should bind input value with search property', async () => {
    component.search = 'initial value';
    fixture.detectChanges();
    await fixture.whenStable();

    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputEl.value).toBe('initial value');
  });

  it('should emit value on ngModelChange', () => {
    spyOn(component.inputChanged, 'emit');

    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    inputEl.value = 'abc';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.inputChanged.emit).toHaveBeenCalledWith('abc');
  });

  it('should clear input and emit empty string on clear button click', () => {
    spyOn(component.inputChanged, 'emit');

    component.search = 'something';
    fixture.detectChanges();

    const clearBtn = fixture.debugElement.query(By.css('.clear-icon'));
    expect(clearBtn).toBeTruthy();

    clearBtn.nativeElement.click();
    fixture.detectChanges();

    expect(component.search).toBe('');
    expect(component.inputChanged.emit).toHaveBeenCalledWith('');
  });

  it('should not show clear icon when input is empty', () => {
    component.search = '';
    fixture.detectChanges();

    const clearIcon = fixture.debugElement.query(By.css('.clear-icon'));
    expect(clearIcon).toBeNull();
  });

  it('should show clear icon when input is not empty', () => {
    component.search = 'not empty';
    fixture.detectChanges();

    const clearIcon = fixture.debugElement.query(By.css('.clear-icon'));
    expect(clearIcon).not.toBeNull();
  });
});
