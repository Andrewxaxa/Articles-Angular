import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ROUTES_CONFIG } from '../routes.config';
import { RouterModule } from '@angular/router';

interface INavRoute {
  name: string;
  path: string;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, MatButton, MatIcon],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  routes: INavRoute[] = [
    {
      name: ROUTES_CONFIG.ARTICLES.name,
      path: ROUTES_CONFIG.ARTICLES.path,
    },
  ];
}
