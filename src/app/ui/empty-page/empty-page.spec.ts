import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyPage } from './empty-page';
import { By } from '@angular/platform-browser';
import { ComponentRef } from '@angular/core';

describe('EmptyPage', () => {
  let fixture: ComponentFixture<EmptyPage>;
  let component: EmptyPage;
  let componentRef: ComponentRef<EmptyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyPage],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyPage);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should render default text if none is provided', () => {
    const paragraph = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(paragraph.textContent).toContain('There are no items to display');
  });

  it('should display provided text input', () => {
    componentRef.setInput('text', 'There are no items to display');
    fixture.detectChanges();

    const paragraph = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(paragraph.textContent).toContain('There are no items to display');
  });

  it('should display placeholder image with correct attributes', () => {
    const imgEl = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgEl.getAttribute('src')).toBe(
      'https://cdn-icons-png.flaticon.com/512/4076/4076549.png'
    );
    expect(imgEl.getAttribute('alt')).toBe('No articles');
    expect(imgEl.getAttribute('width')).toBe('120');
    expect(imgEl.getAttribute('height')).toBe('120');
  });
});
