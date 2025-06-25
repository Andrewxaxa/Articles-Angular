import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { guestGuard } from './guest-guard';
import { AuthService } from '../auth-service';
import { of } from 'rxjs';

describe('guestGuard', () => {
  let routerMock: jasmine.SpyObj<Router>;
  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = { url: '/some-path' } as RouterStateSnapshot;

  const executeGuard: CanActivateFn = (...params) =>
    TestBed.runInInjectionContext(() => guestGuard(...params));

  beforeEach(() => {
    routerMock = jasmine.createSpyObj('Router', ['createUrlTree']);
    routerMock.createUrlTree.and.returnValue({} as UrlTree);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerMock },
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', [], {
            user$: of(null),
          }),
        },
      ],
    });
  });

  it('should allow access if user is not logged in', async () => {
    const result = await executeGuard(mockRoute, mockState);
    expect(result).toBeTrue();
    expect(routerMock.createUrlTree).not.toHaveBeenCalled();
  });

  it('should redirect to "/" if user is logged in', async () => {
    TestBed.overrideProvider(AuthService, {
      useValue: jasmine.createSpyObj('AuthService', [], {
        user$: of({ uid: 'abc123' }),
      }),
    });

    const result = await executeGuard(mockRoute, mockState);

    expect(routerMock.createUrlTree).toHaveBeenCalledWith(['/']);
    expect(result).toEqual(
      routerMock.createUrlTree.calls.mostRecent().returnValue
    );
  });
});
