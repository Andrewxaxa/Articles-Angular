import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { REQUIRED_MESSAGE, TOO_SHORT_MESSAGE } from '../../../util/messages';

@Component({
  selector: 'app-textarea',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './textarea.html',
  styleUrl: './textarea.scss',
})
export class Textarea {
  name = input.required<string>();
  control = input.required<FormControl>();
  minRows = input(3);

  requiredMessage = (field: string): string => REQUIRED_MESSAGE(field);
  tooShortMessage = (field: string): string => TOO_SHORT_MESSAGE(field);
}
