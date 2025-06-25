import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditArticleForm } from './edit-article-form';
import { ComponentRef } from '@angular/core';
import { articleMock } from '../../../util/mocks/articles-mock';
import { IUpdateArticle } from '../../interfaces/articles.interface';
import { By } from '@angular/platform-browser';
import { SpinnerButton } from '../../../ui/spinner-button/spinner-button';

describe('EditArticleForm', () => {
  let component: EditArticleForm;
  let fixture: ComponentFixture<EditArticleForm>;
  let componentRef: ComponentRef<EditArticleForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditArticleForm],
    }).compileComponents();

    fixture = TestBed.createComponent(EditArticleForm);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('article', articleMock);
    componentRef.setInput('isLoading', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should patch form values when article input is set', () => {
    expect(component.articleForm.value).toEqual({
      title: articleMock.title,
      summary: articleMock.summary,
      content: articleMock.content,
    });
  });

  it('should emit event when form is valid and submitted', () => {
    spyOn(component.submitClicked, 'emit');

    const emitValue = {
      ...component.articleForm.value,
      updatedAt: new Date(),
    } as IUpdateArticle;

    component.onSubmit();

    expect(component.submitClicked.emit).toHaveBeenCalledWith(emitValue);
  });

  it('should not emit submitClicked when form is invalid', () => {
    spyOn(component.submitClicked, 'emit');

    component.articleForm.setValue({
      title: '',
      summary: '',
      content: '',
    });

    component.onSubmit();
    expect(component.submitClicked.emit).not.toHaveBeenCalled();
  });

  it('should disable the submit button when isLoading is true', () => {
    componentRef.setInput('isLoading', true);

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.directive(SpinnerButton));

    expect(button.componentInstance.disabled()).toBeTrue();
    expect(button.componentInstance.isLoading()).toBeTrue();
  });
});
