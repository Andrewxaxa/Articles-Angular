import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyArticlesPage } from './my-articles-page';

describe('MyArticlesPage', () => {
  let component: MyArticlesPage;
  let fixture: ComponentFixture<MyArticlesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyArticlesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyArticlesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
