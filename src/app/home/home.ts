import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth-service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private authService = inject(AuthService);

  get user() {
    return this.authService.user();
  }
}
