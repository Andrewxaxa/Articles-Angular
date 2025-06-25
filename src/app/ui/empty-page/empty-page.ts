import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-page',
  imports: [],
  templateUrl: './empty-page.html',
  styleUrl: './empty-page.scss',
})
export class EmptyPage {
  text = input('There are no items to display');
}
