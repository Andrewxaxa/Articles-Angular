import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ArticlesPage } from './articles-page';
import { ArticlesFirebaseService } from '../../services/articles-firebase-service';
import { of, Subject, throwError } from 'rxjs';
import { articlesMock } from '../../../util/mocks/articles-mock';
import { By } from '@angular/platform-browser';
import { LoadingPage } from '../../../ui/loading-page/loading-page';
import { provideRouter } from '@angular/router';
import { ArticlesSearch } from '../articles-search/articles-search';
import { EmptyPage } from '../../../ui/empty-page/empty-page';

describe('Articles', () => {
  let component: ArticlesPage;
  let fixture: ComponentFixture<ArticlesPage>;

  let articlesFirebaseServiceMock: jasmine.SpyObj<ArticlesFirebaseService>;

  beforeEach(async () => {
    articlesFirebaseServiceMock = jasmine.createSpyObj(
      ArticlesFirebaseService,
      ['getArticles$']
    );

    await TestBed.configureTestingModule({
      imports: [ArticlesPage],
      providers: [
        {
          provide: ArticlesFirebaseService,
          useValue: articlesFirebaseServiceMock,
        },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlesPage);
    component = fixture.componentInstance;
  });

  it('should render loading page initially', () => {
    const articlesSubject = new Subject<any[]>();
    articlesFirebaseServiceMock.getArticles$.and.returnValue(
      articlesSubject.asObservable()
    );

    fixture.detectChanges();

    const loading = fixture.debugElement.query(By.directive(LoadingPage));
    expect(loading).toBeTruthy();
  });

  it('should render articles list if articles exist', fakeAsync(() => {
    articlesFirebaseServiceMock.getArticles$.and.returnValue(of(articlesMock));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const articlesSearch = fixture.debugElement.query(
      By.directive(ArticlesSearch)
    );
    expect(articlesSearch).toBeTruthy();
  }));

  it('should render empty page if no articles', fakeAsync(() => {
    articlesFirebaseServiceMock.getArticles$.and.returnValue(of([]));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const empty = fixture.debugElement.query(By.directive(EmptyPage));
    expect(empty).toBeTruthy();
  }));

  it('should render empty page if service errors', fakeAsync(() => {
    articlesFirebaseServiceMock.getArticles$.and.returnValue(
      throwError(() => new Error('error'))
    );
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const empty = fixture.debugElement.query(By.directive(EmptyPage));
    expect(empty).toBeTruthy();
  }));
});
