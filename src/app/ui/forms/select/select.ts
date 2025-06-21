import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { REQUIRED_MESSAGE } from '../../../util/messages';

export interface ISelectOption {
  key: string | number;
  label: string;
  value: any;
}

@Component({
  selector: 'app-select',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './select.html',
  styleUrl: './select.scss',
})
export class Select {
  name = input.required<string>();
  options = input.required<ISelectOption[]>();
  control = input.required<FormControl>();

  requiredMessage = (field: string): string => REQUIRED_MESSAGE(field);
}
