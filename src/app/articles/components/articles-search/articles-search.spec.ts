import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesSearch } from './articles-search';

describe('ArticlesSearch', () => {
  let component: ArticlesSearch;
  let fixture: ComponentFixture<ArticlesSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
