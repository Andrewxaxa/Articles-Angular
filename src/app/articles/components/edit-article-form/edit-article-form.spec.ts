import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArticleForm } from './edit-article-form';

describe('EditArticleForm', () => {
  let component: EditArticleForm;
  let fixture: ComponentFixture<EditArticleForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditArticleForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditArticleForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
