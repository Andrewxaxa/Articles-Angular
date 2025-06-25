import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleDetails } from './article-details';
import { ComponentRef, DebugElement } from '@angular/core';
import { articleMock } from '../../../util/mocks/articles-mock';
import { By } from '@angular/platform-browser';
import { MatCardImage } from '@angular/material/card';

describe('ArticleDetails', () => {
  let component: ArticleDetails;
  let fixture: ComponentFixture<ArticleDetails>;
  let componentRef: ComponentRef<ArticleDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleDetails);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('article', articleMock);
    componentRef.setInput('isCreator', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Article data rendering', () => {
    it('should display the article title', () => {
      const titleElement = fixture.debugElement.query(By.css('mat-card-title'));
      expect(titleElement.nativeElement.textContent).toContain(
        articleMock.title
      );
    });

    it('should display the article creation date', () => {
      const createdAtElement = fixture.debugElement.queryAll(
        By.css('mat-card-subtitle')
      )[0];
      expect(createdAtElement.nativeElement.textContent).toContain(
        '1/1/25, 11:00 AM'
      );
    });

    it('should display the article last update date', () => {
      const updatedAtElement = fixture.debugElement.queryAll(
        By.css('mat-card-subtitle')
      )[1];
      expect(updatedAtElement.nativeElement.textContent).toContain(
        '1/1/25, 11:00 AM'
      );
    });

    it('should display the article image with correct src and alt', () => {
      const imgElement: HTMLImageElement = fixture.debugElement.query(
        By.directive(MatCardImage)
      ).nativeElement;
      expect(imgElement.src).toContain(articleMock.cdnUrl);
      expect(imgElement.alt).toBe('Article Image');
    });

    it('should display the article summary', () => {
      const summaryElement = fixture.debugElement.query(By.css('.summary'));
      expect(summaryElement.nativeElement.textContent).toBe(
        articleMock.summary
      );
    });

    it('should display the article content using innerHTML', () => {
      const contentElement = fixture.debugElement.query(By.css('.content'));
      expect(contentElement.nativeElement.innerHTML).toBe(articleMock.content);
    });
  });

  describe('Action buttons visibility', () => {
    it('should not display edit and delete buttons when isCreator is false', () => {
      componentRef.setInput('isCreator', false);
      fixture.detectChanges();

      const editButton = fixture.debugElement.query(By.css('.edit-icon'));
      const deleteButton = fixture.debugElement.query(By.css('.delete-icon'));

      expect(editButton).toBeNull();
      expect(deleteButton).toBeNull();
    });

    it('should display edit and delete buttons when isCreator is true', () => {
      componentRef.setInput('isCreator', true);
      fixture.detectChanges();

      const editButton = fixture.debugElement.query(By.css('.edit-icon'));
      const deleteButton = fixture.debugElement.query(By.css('.delete-icon'));

      expect(editButton).not.toBeNull();
      expect(deleteButton).not.toBeNull();
    });
  });

  describe('Event emissions', () => {
    let editButton: DebugElement;
    let deleteButton: DebugElement;

    beforeEach(() => {
      componentRef.setInput('isCreator', true);
      fixture.detectChanges();
      editButton = fixture.debugElement.query(By.css('.edit-icon'));
      deleteButton = fixture.debugElement.query(By.css('.delete-icon'));
    });

    it('should emit articleEditClicked when edit button is clicked', () => {
      const editSpy = spyOn(component.articleEditClicked, 'emit' as any);

      editButton.nativeElement.click();

      expect(editSpy).toHaveBeenCalled();
    });

    it('should emit articleDeleteClicked when delete button is clicked', () => {
      const deleteSpy = spyOn(component.articleDeleteClicked, 'emit' as any);

      deleteButton.nativeElement.click();

      expect(deleteSpy).toHaveBeenCalled();
    });
  });
});
