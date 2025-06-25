import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Signup } from './signup';
import { AuthService } from '../auth-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { signupPayloadMock } from '../../util/mocks/auth.mock';

describe('Signup', () => {
  let component: Signup;
  let fixture: ComponentFixture<Signup>;

  let authServiceMock: jasmine.SpyObj<AuthService>;
  let toastrMock: jasmine.SpyObj<ToastrService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['signup']);
    toastrMock = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [Signup],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ToastrService, useValue: toastrMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Signup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if form is invalid and mark all as touched', () => {
    component.signupForm.setValue({ username: '', email: '', password: '' });
    component.onSubmit();

    expect(authServiceMock.signup).not.toHaveBeenCalled();
  });

  it('should submit valid form and navigate on success', fakeAsync(() => {
    component.signupForm.setValue(signupPayloadMock);
    authServiceMock.signup.and.returnValue(Promise.resolve());

    component.onSubmit();
    tick();

    expect(authServiceMock.signup).toHaveBeenCalledWith(signupPayloadMock);
    expect(toastrMock.success).toHaveBeenCalledWith('Signed up');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    expect(component.isLoading()).toBeFalse();
  }));

  it('should show error toast with message when error is instance of Error', fakeAsync(() => {
    const error = new Error('Signup failed');
    authServiceMock.signup.and.returnValue(Promise.reject(error));

    component.signupForm.setValue(signupPayloadMock);

    component.onSubmit();
    tick();

    expect(toastrMock.error).toHaveBeenCalledWith('Signup failed');
    expect(component.isLoading()).toBeFalse();
  }));
});
