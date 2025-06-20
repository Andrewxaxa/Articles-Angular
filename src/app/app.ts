import { Component, inject, OnDestroy, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { AuthService } from './auth/auth-service';
import { IUser } from './auth/user.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);

  private destroy$ = new Subject<void>();
  protected title = 'articles-angular';
  user: IUser | null | undefined;
  userDataLoading = signal(true);

  constructor() {
    this.authService.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      if (user) {
        this.authService.user.set({
          username: user.displayName!,
          email: user.email!,
        });
      } else {
        this.authService.user.set(null);
      }

      this.user = this.authService.user();
      this.userDataLoading.set(false);
      console.log('logged in user:', this.authService.user());
    });
  }

  async logout() {
    this.authService.logout();
    this.authService.user.set(null);
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
