import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { authGuard } from './auth-guard';
import { AuthService } from '../auth-service';
import { of } from 'rxjs';

describe('authGuard', () => {
  let routerMock: jasmine.SpyObj<Router>;

  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = { url: '/protected' } as RouterStateSnapshot;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    routerMock = jasmine.createSpyObj('Router', ['createUrlTree']);
    routerMock.createUrlTree.and.returnValue({} as UrlTree);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerMock },
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', [], {
            user$: of({ uid: 'user123' }),
          }),
        },
      ],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow access if user is logged in', async () => {
    const result = await executeGuard(mockRoute, mockState);
    expect(result).toBeTrue();
    expect(routerMock.createUrlTree).not.toHaveBeenCalled();
  });

  it('should redirect to /login if user is not logged in', async () => {
    TestBed.overrideProvider(AuthService, {
      useValue: jasmine.createSpyObj('AuthService', [], {
        user$: of(null),
      }),
    });

    const result = await executeGuard(mockRoute, mockState);
    expect(routerMock.createUrlTree).toHaveBeenCalledWith(['/login'], {
      queryParams: { redirectUrl: mockState.url },
    });
    expect(result).toEqual(
      routerMock.createUrlTree.calls.mostRecent().returnValue
    );
  });
});
