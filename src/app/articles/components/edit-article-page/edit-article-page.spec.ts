import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { EditArticlePage } from './edit-article-page';
import { ArticlesFirebaseService } from '../../services/articles-firebase-service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { LoadingPage } from '../../../ui/loading-page/loading-page';
import { articleMock } from '../../../util/mocks/articles-mock';
import { EditArticleForm } from '../edit-article-form/edit-article-form';
import { EmptyPage } from '../../../ui/empty-page/empty-page';
import { IUpdateArticle } from '../../interfaces/articles.interface';

describe('EditArticle', () => {
  let component: EditArticlePage;
  let fixture: ComponentFixture<EditArticlePage>;

  let mockArticleService: jasmine.SpyObj<ArticlesFirebaseService>;
  let mockToastr: jasmine.SpyObj<ToastrService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const activatedRouteValue = {
    snapshot: {
      paramMap: {
        get: () => 'article1',
      },
    },
  } as any;

  beforeEach(async () => {
    mockArticleService = jasmine.createSpyObj('ArticlesFirebaseService', [
      'getArticle$',
      'editArticle',
    ]);
    mockToastr = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [EditArticlePage],
      providers: [
        { provide: ArticlesFirebaseService, useValue: mockArticleService },
        { provide: ToastrService, useValue: mockToastr },
        { provide: ActivatedRoute, useValue: activatedRouteValue },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditArticlePage);
    component = fixture.componentInstance;
  });

  it('should render loading page initially', () => {
    mockArticleService.getArticle$.and.returnValue(new Subject());
    fixture.detectChanges();

    const loadingPage = fixture.debugElement.query(By.directive(LoadingPage));
    expect(loadingPage).toBeTruthy();
  });

  it('should render edit form if article is found', fakeAsync(() => {
    mockArticleService.getArticle$.and.returnValue(of(articleMock));

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const editArticleForm = fixture.debugElement.query(
      By.directive(EditArticleForm)
    );
    expect(editArticleForm).toBeTruthy();
  }));

  it('should render empty page if article is not found', fakeAsync(() => {
    mockArticleService.getArticle$.and.returnValue(of(undefined));

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const emptyPage = fixture.debugElement.query(By.directive(EmptyPage));
    expect(emptyPage).toBeTruthy();
  }));

  it('should call editArticle, show success, and navigate on success', fakeAsync(async () => {
    mockArticleService.getArticle$.and.returnValue(of(articleMock));
    mockArticleService.editArticle.and.resolveTo(undefined);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const editArticlePayload: IUpdateArticle = {
      title: 'editedTitle',
      summary: 'editedSummary',
      content: 'editedContent',
      updatedAt: new Date(),
    };

    await component.editArticle(editArticlePayload);

    expect(component.submitLoading()).toBeFalse();
    expect(mockArticleService.editArticle).toHaveBeenCalledWith(
      articleMock.id,
      editArticlePayload
    );
    expect(mockToastr.success).toHaveBeenCalledWith('Article edited');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['../'], {
      relativeTo: activatedRouteValue,
    });
  }));

  it('should handle error in editArticle and show error toast', fakeAsync(async () => {
    mockArticleService.getArticle$.and.returnValue(of(articleMock));
    mockArticleService.editArticle.and.rejectWith(new Error('error'));

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const editArticlePayload: IUpdateArticle = {
      title: 'editedTitle',
      summary: 'editedSummary',
      content: 'editedContent',
      updatedAt: new Date(),
    };

    await component.editArticle(editArticlePayload);

    expect(mockToastr.error).toHaveBeenCalled();
    expect(component.submitLoading()).toBeFalse();
  }));
});
