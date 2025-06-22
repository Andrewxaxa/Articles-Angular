import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryArticlesPage } from './category-articles-page';

describe('CategoryArticlesPage', () => {
  let component: CategoryArticlesPage;
  let fixture: ComponentFixture<CategoryArticlesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryArticlesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryArticlesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
