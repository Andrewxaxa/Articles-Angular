import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { CategoriesPage } from './categories';
import { ComponentRef } from '@angular/core';
import { CategoriesFirebaseService } from '../../services/categories-firebase-service';
import { of, Subject, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { LoadingPage } from '../../../ui/loading-page/loading-page';
import { categoriesMock } from '../../../util/mocks/categories-mock';
import { CategoryCards } from '../category-cards/category-cards';
import { provideRouter } from '@angular/router';
import { EmptyPage } from '../../../ui/empty-page/empty-page';

describe('ArticleCategoriesPage', () => {
  let component: CategoriesPage;
  let fixture: ComponentFixture<CategoriesPage>;
  let componentRef: ComponentRef<CategoriesPage>;

  let categoriesServiceMock: jasmine.SpyObj<CategoriesFirebaseService>;

  beforeEach(async () => {
    categoriesServiceMock = jasmine.createSpyObj(CategoriesFirebaseService, [
      'getCategories$',
    ]);

    await TestBed.configureTestingModule({
      imports: [CategoriesPage],
      providers: [
        {
          provide: CategoriesFirebaseService,
          useValue: categoriesServiceMock,
        },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesPage);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  it('should render loading page initially', () => {
    const categoriesSubject = new Subject<any[]>();
    categoriesServiceMock.getCategories$.and.returnValue(
      categoriesSubject.asObservable()
    );

    fixture.detectChanges();

    const loading = fixture.debugElement.query(By.directive(LoadingPage));
    expect(loading).toBeTruthy();
  });

  it('should render category cards of categories exists', fakeAsync(() => {
    categoriesServiceMock.getCategories$.and.returnValue(of(categoriesMock));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const categoryCards = fixture.debugElement.query(
      By.directive(CategoryCards)
    );
    expect(categoryCards).toBeTruthy();
  }));

  it('should render empty page if no categories', fakeAsync(() => {
    categoriesServiceMock.getCategories$.and.returnValue(of([]));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const empty = fixture.debugElement.query(By.directive(EmptyPage));
    expect(empty).toBeTruthy();
  }));

  it('should render empty page in case of error', fakeAsync(() => {
    categoriesServiceMock.getCategories$.and.returnValue(
      throwError(() => new Error('error'))
    );
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const empty = fixture.debugElement.query(By.directive(EmptyPage));
    expect(empty).toBeTruthy();
  }));
});
