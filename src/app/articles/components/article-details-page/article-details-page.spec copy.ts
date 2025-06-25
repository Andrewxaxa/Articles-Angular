// import {
//   ComponentFixture,
//   fakeAsync,
//   TestBed,
//   tick,
// } from '@angular/core/testing';
// import { ArticleDetailsPage } from './article-details-page';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ArticlesFirebaseService } from '../../services/articles-firebase-service';
// import { AuthService } from '../../../auth/auth-service';
// import { ToastrService } from 'ngx-toastr';
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { ConfirmDialog } from '../../../ui/confirm-dialog/confirm-dialog';
// import { of } from 'rxjs';
// import { articleMock } from '../../../util/mocks/articles-mock';

// xdescribe('ArticleDetailsPage', () => {
//   let fixture: ComponentFixture<ArticleDetailsPage>;
//   let component: ArticleDetailsPage;

//   let activatedRouteMock: any;
//   let routerSpy: jasmine.SpyObj<Router>;
//   let articlesFirebaseServiceMock: jasmine.SpyObj<ArticlesFirebaseService>;
//   let authServiceMock: jasmine.SpyObj<AuthService>;
//   let toastrMock: jasmine.SpyObj<ToastrService>;
//   let matDialogMock: jasmine.SpyObj<MatDialog>;
//   let matDialogRefMock: jasmine.SpyObj<MatDialogRef<ConfirmDialog, boolean>>;

//   beforeEach(async () => {
//     routerSpy = jasmine.createSpyObj('Router', ['navigate']);
//     articlesFirebaseServiceMock = jasmine.createSpyObj(
//       'ArticlesFirebaseService',
//       ['getArticle$', 'deleteArticle']
//     );
//     authServiceMock = jasmine.createSpyObj('AuthService', ['isCreator']);
//     toastrMock = jasmine.createSpyObj('ToastrService', ['success', 'error']);
//     matDialogMock = jasmine.createSpyObj('MatDialog', ['open']);
//     matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
//     activatedRouteMock = {
//       snapshot: {
//         paramMap: {
//           get: (key: string) => (key === 'id' ? 'articleMock123' : null),
//         },
//       },
//       url: of([{ path: 'article' }, { path: 'article1' }]),
//     };

//     articlesFirebaseServiceMock.getArticle$.and.returnValue(of(articleMock));
//     articlesFirebaseServiceMock.deleteArticle.and.returnValue(
//       Promise.resolve()
//     );
//     authServiceMock.isCreator.and.returnValue(false);
//     matDialogMock.open.and.returnValue(matDialogRefMock);
//     matDialogRefMock.afterClosed.and.returnValue(of(true));

//     await TestBed.configureTestingModule({
//       imports: [ArticleDetailsPage],
//       providers: [
//         { provide: ActivatedRoute, useValue: activatedRouteMock },
//         { provide: Router, useValue: routerSpy },
//         {
//           provide: ArticlesFirebaseService,
//           useValue: articlesFirebaseServiceMock,
//         },
//         { provide: AuthService, useValue: authServiceMock },
//         { provide: ToastrService, useValue: toastrMock },
//         { provide: MatDialog, useValue: matDialogMock },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(ArticleDetailsPage);
//     component = fixture.componentInstance;
//   });

//   afterEach(() => {
//     articlesFirebaseServiceMock.getArticle$.calls.reset();
//     articlesFirebaseServiceMock.deleteArticle.calls.reset();
//     authServiceMock.isCreator.calls.reset();
//     toastrMock.success.calls.reset();
//     toastrMock.error.calls.reset();
//     matDialogMock.open.calls.reset();
//     matDialogRefMock.afterClosed.calls.reset();

//     component.isLoading.set(true);
//     component.article.set(undefined);
//     component.isCreator.set(false);
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should fetch article', () => {
//     articlesFirebaseServiceMock.getArticle$.and.returnValue(of(articleMock));

//     fixture.detectChanges();

//     expect(component.article()).toEqual(articleMock);
//     expect(component.isLoading()).toBeFalse();
//   });

//   it('should handle missing article gracefully', fakeAsync(() => {
//     articlesFirebaseServiceMock.getArticle$.and.returnValue(of(undefined));

//     fixture.detectChanges();
//     tick();

//     expect(component.article()).toBeUndefined();
//     expect(component.isLoading()).toBeFalse();
//   }));
// });
