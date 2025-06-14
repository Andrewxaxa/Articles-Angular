import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-not-found',
  imports: [MatIcon, MatButton],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {}
