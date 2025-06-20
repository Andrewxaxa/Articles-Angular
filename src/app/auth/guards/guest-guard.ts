import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth-service';
import { firstValueFrom } from 'rxjs';

export const guestGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const firebaseUser = await firstValueFrom(authService.user$);

  return firebaseUser ? router.createUrlTree(['/']) : true;
};
