import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search-field',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './search-field.html',
  styleUrl: './search-field.scss',
})
export class SearchField {
  label = input.required();
  inputChanged = output<string>();

  search = '';

  onSearchChange(value: string) {
    this.inputChanged.emit(value);
  }

  onClear() {
    this.search = '';
    this.inputChanged.emit(this.search);
  }
}
