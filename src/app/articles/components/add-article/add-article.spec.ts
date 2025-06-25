import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { AddArticle } from './add-article';
import { Router } from '@angular/router';
import { ArticlesFirebaseService } from '../../services/articles-firebase-service';
import { AuthService } from '../../../auth/auth-service';
import { CategoriesFirebaseService } from '../../services/categories-firebase-service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { categoriesMock } from '../../../util/mocks/categories-mock';
import { By } from '@angular/platform-browser';
import { DocumentData, DocumentReference } from '@angular/fire/firestore';
import { INewArticle } from '../../interfaces/articles.interface';
import { userMock } from '../../../util/mocks/auth.mock';

describe('AddArticle', () => {
  let fixture: ComponentFixture<AddArticle>;
  let component: AddArticle;

  let articleServiceMock: jasmine.SpyObj<ArticlesFirebaseService>;
  let categoriesServiceMock: jasmine.SpyObj<CategoriesFirebaseService>;
  let toastrMock: jasmine.SpyObj<ToastrService>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    articleServiceMock = jasmine.createSpyObj('ArticlesFirebaseService', [
      'addArticle',
    ]);
    categoriesServiceMock = jasmine.createSpyObj('CategoriesFirebaseService', [
      'getCategories$',
    ]);
    toastrMock = jasmine.createSpyObj('ToastrService', [
      'success',
      'warning',
      'error',
    ]);
    authServiceMock = jasmine.createSpyObj('AuthService', [], {
      user: () => userMock,
    });

    categoriesServiceMock.getCategories$.and.returnValue(of(categoriesMock));

    await TestBed.configureTestingModule({
      imports: [AddArticle],
      providers: [
        { provide: ArticlesFirebaseService, useValue: articleServiceMock },
        { provide: CategoriesFirebaseService, useValue: categoriesServiceMock },
        { provide: ToastrService, useValue: toastrMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddArticle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the form', () => {
    const form = fixture.debugElement.query(By.css('form'));
    expect(form).toBeTruthy();
  });

  it('should set cdnUrl on file upload', () => {
    const testUrl = 'http://test.com/image.png';
    component.onFileUploaded(testUrl);
    expect(component.articleForm.get('cdnUrl')?.value).toBe(testUrl);
  });

  it('should clear cdnUrl on file removed', () => {
    component.articleForm.get('cdnUrl')?.setValue('some-url');
    component.onFileRemoved();
    expect(component.articleForm.get('cdnUrl')?.value).toBe('');
  });

  it('should not submit when form is invalid', () => {
    component.onSubmit();
    expect(articleServiceMock.addArticle).not.toHaveBeenCalled();
  });

  it('should not submit if cdnUrl is missing', () => {
    component.articleForm.setValue({
      title: 'Valid title',
      summary: 'Valid summary',
      content: 'Valid content longer than 10 chars',
      category: 'Tech',
      cdnUrl: '',
    });
    component.onSubmit();
    expect(toastrMock.warning).toHaveBeenCalledWith(
      'Please upload image for your article'
    );
    expect(articleServiceMock.addArticle).not.toHaveBeenCalled();
  });

  it('should submit article when form is valid', fakeAsync(() => {
    const mockDocRef = { id: 'fake-id' } as DocumentReference<
      INewArticle,
      DocumentData
    >;
    articleServiceMock.addArticle.and.returnValue(Promise.resolve(mockDocRef));

    component.articleForm.setValue({
      title: 'Valid title',
      summary: 'Valid summary',
      content: 'Valid content longer than 10 chars',
      category: 'Tech',
      cdnUrl: 'http://image.png',
    });

    component.onSubmit();
    tick();

    expect(articleServiceMock.addArticle).toHaveBeenCalled();
    expect(toastrMock.success).toHaveBeenCalledWith('New article added');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/articles']);
  }));

  it('should show error toast when article add fails', fakeAsync(() => {
    articleServiceMock.addArticle.and.returnValue(Promise.reject('error'));

    component.articleForm.setValue({
      title: 'Valid title',
      summary: 'Valid summary',
      content: 'Valid content',
      category: 'Tech',
      cdnUrl: 'some-url',
    });

    component.onSubmit();
    tick();

    expect(toastrMock.error).toHaveBeenCalled();
  }));
});
