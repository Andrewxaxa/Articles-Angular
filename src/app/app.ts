import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { AuthService } from './auth/auth-service';
import { IUser } from './auth/user.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  protected title = 'articles-angular';
  user: IUser | null | undefined;
  userDataLoading = signal(true);

  ngOnInit(): void {
    this.authService.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user) => {
        if (user) {
          this.authService.user.set({
            username: user.displayName!,
            email: user.email!,
            uid: user.uid!,
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
}
