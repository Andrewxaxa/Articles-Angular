import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ROUTES_CONFIG } from '../routes.config';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IUser } from '../auth/user.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface INavRoute {
  name: string;
  path: string;
}

@Component({
  selector: 'app-navbar',
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  user = input.required<IUser | null | undefined>();
  logoutClicked = output<void>();
  userDataLoading = input.required<boolean>();

  routes: INavRoute[] = [
    {
      name: ROUTES_CONFIG.ARTICLES.name,
      path: ROUTES_CONFIG.ARTICLES.path,
    },
    {
      name: ROUTES_CONFIG.ADD_ARTICLE.name,
      path: ROUTES_CONFIG.ADD_ARTICLE.path,
    },
  ];
  routesConfig = ROUTES_CONFIG;
}
