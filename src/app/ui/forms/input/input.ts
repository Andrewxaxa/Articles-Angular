import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { REQUIRED_MESSAGE, TOO_SHORT_MESSAGE } from '../../../util/messages';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class Input {
  control = input.required<FormControl>();

  requiredMessage = (field: string): string => REQUIRED_MESSAGE(field);
  tooShortMessage = (field: string): string => TOO_SHORT_MESSAGE(field);
}
