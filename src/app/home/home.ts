import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private authService = inject(AuthService);

  get user() {
    return this.authService.user();
  }
}
