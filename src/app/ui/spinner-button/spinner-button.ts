import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner-button',
  imports: [MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './spinner-button.html',
  styleUrl: './spinner-button.scss',
})
export class SpinnerButton {
  text = input.required();
  color = input('primary');
  isLoading = input(false);
  disabled = input(false);
  type = input('submit');
}
