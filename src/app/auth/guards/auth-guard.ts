import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth-service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const firebaseUser = await firstValueFrom(authService.user$);

  if (!firebaseUser) {
    return router.createUrlTree(['/login'], {
      queryParams: { redirectUrl: state.url },
    });
  }
  return true;
};
