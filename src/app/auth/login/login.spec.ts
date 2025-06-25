import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Login } from './login';
import { AuthService } from '../auth-service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { loginPayloadMock } from '../../util/mocks/auth.mock';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  let authServiceMock: jasmine.SpyObj<AuthService>;
  let toastrServiceMock: jasmine.SpyObj<ToastrService>;
  let routerMock: jasmine.SpyObj<Router>;
  let activatedRouteMock: Partial<ActivatedRoute>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['login']);
    toastrServiceMock = jasmine.createSpyObj('ToastrService', [
      'success',
      'error',
    ]);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    activatedRouteMock = {
      snapshot: {
        queryParamMap: {
          get: (key: string) => null,
        },
      },
    } as any;

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if form is invalid', () => {
    component.loginForm.setValue({ email: '', password: '' });
    component.onSubmit();
    expect(authServiceMock.login).not.toHaveBeenCalled();
  });

  it('should submit form and navigate on success', fakeAsync(() => {
    component.loginForm.setValue(loginPayloadMock);
    authServiceMock.login.and.returnValue(Promise.resolve() as Promise<any>);

    component.onSubmit();
    tick();

    expect(authServiceMock.login).toHaveBeenCalledWith(loginPayloadMock);
    expect(toastrServiceMock.success).toHaveBeenCalledWith('Logged in');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    expect(component.isLoading()).toBeFalse();
  }));

  it('should navigate to redirectUrl if provided in query params', fakeAsync(() => {
    ((activatedRouteMock.snapshot as any).queryParamMap.get as jasmine.Spy) =
      jasmine.createSpy().withArgs('redirectUrl').and.returnValue('/dashboard');

    component.loginForm.setValue(loginPayloadMock);

    authServiceMock.login.and.returnValue(Promise.resolve() as Promise<any>);

    component.onSubmit();
    tick();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
  }));

  it('should show error message if login throws an Error', fakeAsync(() => {
    const errorMessage = 'Invalid credentials';
    component.loginForm.setValue(loginPayloadMock);

    authServiceMock.login.and.returnValue(
      Promise.reject(new Error(errorMessage))
    );

    component.onSubmit();
    tick();

    expect(toastrServiceMock.error).toHaveBeenCalledWith(errorMessage);
    expect(component.isLoading()).toBeFalse();
  }));
});
