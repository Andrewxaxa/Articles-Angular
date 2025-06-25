import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MyArticlesPage } from './my-articles-page';
import { ArticlesFirebaseService } from '../../services/articles-firebase-service';
import { AuthService } from '../../../auth/auth-service';
import { of, Subject, throwError } from 'rxjs';
import { IArticle } from '../../interfaces/articles.interface';
import { By } from '@angular/platform-browser';
import { LoadingPage } from '../../../ui/loading-page/loading-page';
import { articlesMock } from '../../../util/mocks/articles-mock';
import { ArticlesList } from '../articles-list/articles-list';
import { ActivatedRoute } from '@angular/router';
import { EmptyPage } from '../../../ui/empty-page/empty-page';
import { userMock } from '../../../util/mocks/auth.mock';

describe('MyArticlesPage', () => {
  let component: MyArticlesPage;
  let fixture: ComponentFixture<MyArticlesPage>;

  let mockArticlesService: jasmine.SpyObj<ArticlesFirebaseService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  const activatedRouteValue = {
    snapshot: {},
  } as any;

  beforeEach(async () => {
    mockArticlesService = jasmine.createSpyObj('ArticlesFirebaseService', [
      'getUserArticles$',
    ]);
    mockAuthService = jasmine.createSpyObj('AuthService', [], {
      user: () => userMock,
    });

    await TestBed.configureTestingModule({
      imports: [MyArticlesPage],
      providers: [
        { provide: ArticlesFirebaseService, useValue: mockArticlesService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: ActivatedRoute, useValue: activatedRouteValue },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MyArticlesPage);
    component = fixture.componentInstance;
  });

  it('should show loading initially', () => {
    const subject = new Subject<IArticle[]>();
    mockArticlesService.getUserArticles$.and.returnValue(subject);

    fixture.detectChanges();

    const loadingPage = fixture.debugElement.query(By.directive(LoadingPage));
    expect(loadingPage).toBeTruthy();
  });

  it('should show articles list if articles exist', fakeAsync(() => {
    mockArticlesService.getUserArticles$.and.returnValue(of(articlesMock));

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const list = fixture.debugElement.query(By.directive(ArticlesList));
    expect(list).toBeTruthy();
  }));

  it('should show empty page if no articles', fakeAsync(() => {
    mockArticlesService.getUserArticles$.and.returnValue(of([]));

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const empty = fixture.debugElement.query(By.directive(EmptyPage));
    expect(empty).toBeTruthy();
  }));

  it('should show empty page on error', fakeAsync(() => {
    mockArticlesService.getUserArticles$.and.returnValue(
      throwError(() => new Error('error'))
    );

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const empty = fixture.debugElement.query(By.directive(EmptyPage));
    expect(empty).toBeTruthy();
    expect(component.articles()).toEqual([]);
  }));
});
