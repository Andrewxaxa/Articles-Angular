import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyPage } from './empty-page-page';

describe('Empty', () => {
  let component: EmptyPage;
  let fixture: ComponentFixture<EmptyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyPage],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
