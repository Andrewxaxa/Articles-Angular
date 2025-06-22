import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesPage } from './categories';

describe('ArticleCategoriesPage', () => {
  let component: CategoriesPage;
  let fixture: ComponentFixture<CategoriesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
