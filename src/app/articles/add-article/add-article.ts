import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { REQUIRED_MESSAGE, TOO_SHORT_MESSAGE } from '../../util/messages';
import { Input } from '../../ui/forms/input/input';
import { Textarea } from '../../ui/forms/textarea/textarea';

@Component({
  selector: 'app-add-article',
  imports: [ReactiveFormsModule, MatButtonModule, Input, Textarea],
  templateUrl: './add-article.html',
  styleUrl: './add-article.scss',
})
export class AddArticle {
  private formBuilder = inject(FormBuilder);
  requiredMessage = (field: string): string => REQUIRED_MESSAGE(field);
  tooShortMessage = (field: string): string => TOO_SHORT_MESSAGE(field);

  articleForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    summary: ['', [Validators.required, Validators.minLength(5)]],
    content: ['', [Validators.required, Validators.minLength(10)]],
  });

  onSubmit = () => {
    if (!this.articleForm.valid) {
      return;
    }

    const payload = {
      ...this.articleForm.value,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log('payload', payload);

    this.articleForm.reset();
  };
}
