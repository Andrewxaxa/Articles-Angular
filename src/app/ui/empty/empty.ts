import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty',
  imports: [],
  templateUrl: './empty.html',
  styleUrl: './empty.scss',
})
export class Empty {
  text = input('There are no items to display');
}
