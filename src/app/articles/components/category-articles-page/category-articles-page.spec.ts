import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { CategoryArticlesPage } from './category-articles-page';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesFirebaseService } from '../../services/articles-firebase-service';
import { of, Subject, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { LoadingPage } from '../../../ui/loading-page/loading-page';
import { articlesMock } from '../../../util/mocks/articles-mock';
import { ArticlesList } from '../articles-list/articles-list';
import { EmptyPage } from '../../../ui/empty-page/empty-page';
import { ComponentRef } from '@angular/core';

describe('CategoryArticlesPage', () => {
  let component: CategoryArticlesPage;
  let fixture: ComponentFixture<CategoryArticlesPage>;
  let componentRef: ComponentRef<CategoryArticlesPage>;

  let routerMock: jasmine.SpyObj<Router>;
  let articlesServiceMock: jasmine.SpyObj<ArticlesFirebaseService>;
  const categoryName = 'Technology';

  const mockRoute = {};

  beforeEach(async () => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    articlesServiceMock = jasmine.createSpyObj('ArticlesFirebaseService', [
      'getArticles$',
    ]);

    await TestBed.configureTestingModule({
      imports: [CategoryArticlesPage],
      providers: [
        { provide: ArticlesFirebaseService, useValue: articlesServiceMock },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryArticlesPage);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('categoryName', categoryName);
  });

  it('should show loading page initially', () => {
    const subject = new Subject<any[]>();
    articlesServiceMock.getArticles$.and.returnValue(subject.asObservable());

    fixture.detectChanges();

    const loadingPage = fixture.debugElement.query(By.directive(LoadingPage));
    expect(loadingPage).toBeTruthy();
  });

  it('should render filtered articles list with available', fakeAsync(() => {
    const articles = [
      ...articlesMock,
      { ...articlesMock[0], category: categoryName },
    ];
    articlesServiceMock.getArticles$.and.returnValue(of(articles));

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const articlesList = fixture.debugElement.query(By.directive(ArticlesList));
    expect(articlesList).toBeTruthy();
  }));

  it('should render empty page if no matching articles', fakeAsync(() => {
    const notMatchingCategories = [
      ...articlesMock,
      { ...articlesMock[0], category: 'notMatchingName' },
    ];
    articlesServiceMock.getArticles$.and.returnValue(of(notMatchingCategories));

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const emptyPage = fixture.debugElement.query(By.directive(EmptyPage));
    expect(emptyPage).toBeTruthy();
  }));

  it('should show empty page if service fail', fakeAsync(() => {
    articlesServiceMock.getArticles$.and.returnValue(
      throwError(() => new Error('error'))
    );

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const emptyPage = fixture.debugElement.query(By.directive(EmptyPage));
    expect(emptyPage).toBeTruthy();
  }));

  it('should navigate back on back button clicked', fakeAsync(() => {
    articlesServiceMock.getArticles$.and.returnValue(of(articlesMock));

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const backButton = fixture.debugElement.query(By.css('.back-button'));
    backButton.nativeElement.click();

    expect(routerMock.navigate).toHaveBeenCalledWith(['../'], {
      relativeTo: mockRoute as any,
    });
  }));
});
