import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ArticleDetailsPage } from './article-details-page';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';
import { ArticlesFirebaseService } from '../../services/articles-firebase-service';
import { AuthService } from '../../../auth/auth-service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { articleMock } from '../../../util/mocks/articles-mock';
import { GENERAL_ERROR_MESSAGE } from '../../../util/messages';
import { ComponentRef } from '@angular/core';

describe('ArticleDetailsPage', () => {
  let component: ArticleDetailsPage;
  let fixture: ComponentFixture<ArticleDetailsPage>;
  let componentRef: ComponentRef<ArticleDetailsPage>;

  let articlesFirebaseServiceMock: jasmine.SpyObj<ArticlesFirebaseService>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let toastrMock: jasmine.SpyObj<ToastrService>;
  let routerMock: jasmine.SpyObj<Router>;
  let dialogMock: jasmine.SpyObj<MatDialog>;

  const mockRoute = {};

  beforeEach(async () => {
    articlesFirebaseServiceMock = jasmine.createSpyObj(
      'ArticlesFirebaseService',
      ['getArticle$', 'deleteArticle']
    );
    authServiceMock = jasmine.createSpyObj('AuthService', ['isCreator']);
    toastrMock = jasmine.createSpyObj('ToastrService', ['error', 'success']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    articlesFirebaseServiceMock.getArticle$.and.returnValue(of(articleMock));
    articlesFirebaseServiceMock.deleteArticle.and.returnValue(
      Promise.resolve()
    );
    authServiceMock.isCreator.and.returnValue(true);

    await TestBed.configureTestingModule({
      imports: [ArticleDetailsPage],
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: mockRoute,
        },
        {
          provide: ArticlesFirebaseService,
          useValue: articlesFirebaseServiceMock,
        },
        { provide: AuthService, useValue: authServiceMock },
        { provide: ToastrService, useValue: toastrMock },
        { provide: Router, useValue: routerMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleDetailsPage);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('id', 'article1');
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch article successfully', fakeAsync(() => {
    articlesFirebaseServiceMock.getArticle$.and.returnValue(of(articleMock));

    fixture.detectChanges();
    tick();

    expect(component.article()).toEqual(articleMock);
    expect(component.isLoading()).toBeFalse();
  }));

  it('should handle missing article gracefully', fakeAsync(() => {
    articlesFirebaseServiceMock.getArticle$.and.returnValue(of(undefined));

    fixture.detectChanges();
    tick();

    expect(component.article()).toBeUndefined();
    expect(component.isLoading()).toBeFalse();
  }));

  it('should handle error while fetching article', fakeAsync(() => {
    articlesFirebaseServiceMock.getArticle$.and.returnValue(
      throwError(() => new Error('Error!'))
    );

    fixture.detectChanges();
    tick();

    expect(toastrMock.error).toHaveBeenCalledWith(GENERAL_ERROR_MESSAGE);
    expect(component.article()).toBeUndefined();
    expect(component.isLoading()).toBeFalse();
  }));

  it('should navigate to edit page on editArticle()', () => {
    fixture.detectChanges();
    component.editArticle();
    expect(routerMock.navigate).toHaveBeenCalledWith(['edit'], {
      relativeTo: TestBed.inject(ActivatedRoute),
    });
  });

  it('should delete article after confirmation', fakeAsync(() => {
    articlesFirebaseServiceMock.getArticle$.and.returnValue(of(articleMock));
    const afterClosedSubject = new Subject<boolean>();
    dialogMock.open.and.returnValue({
      afterClosed: () => afterClosedSubject.asObservable(),
    } as any);

    articlesFirebaseServiceMock.deleteArticle.and.returnValue(
      Promise.resolve()
    );

    fixture.detectChanges();
    tick();

    component.onDelete();
    afterClosedSubject.next(true);
    afterClosedSubject.complete();
    tick();

    expect(articlesFirebaseServiceMock.deleteArticle).toHaveBeenCalledWith(
      'article1'
    );
    expect(toastrMock.success).toHaveBeenCalledWith('Article deleted');
    const [actualArgs] = routerMock.navigate.calls.argsFor(0);
    expect(actualArgs).toEqual(['../']);
  }));

  it('should not delete article if user cancels confirmation dialog', fakeAsync(() => {
    articlesFirebaseServiceMock.getArticle$.and.returnValue(of(articleMock));
    const afterClosedSubject = new Subject<boolean>();
    dialogMock.open.and.returnValue({
      afterClosed: () => afterClosedSubject.asObservable(),
    } as any);

    fixture.detectChanges();
    tick();

    component.onDelete();
    afterClosedSubject.next(false);
    afterClosedSubject.complete();
    tick();

    expect(articlesFirebaseServiceMock.deleteArticle).not.toHaveBeenCalled();
    expect(toastrMock.success).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  }));
});
