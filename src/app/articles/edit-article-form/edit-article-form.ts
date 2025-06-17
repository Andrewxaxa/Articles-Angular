import {
  Component,
  inject,
  input,
  OnChanges,
  output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Textarea } from '../../ui/forms/textarea/textarea';
import { Input } from '../../ui/forms/input/input';
import { IArticle, IUpdateArticle } from '../articles.interface';

@Component({
  selector: 'app-edit-article-form',
  imports: [ReactiveFormsModule, MatButtonModule, Input, Textarea],
  templateUrl: './edit-article-form.html',
  styleUrl: './edit-article-form.scss',
})
export class EditArticleForm implements OnChanges {
  private formBuilder: FormBuilder = inject(FormBuilder);

  article = input.required<IArticle>();
  submitClicked = output<IUpdateArticle>();

  articleForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    summary: ['', [Validators.required, Validators.minLength(5)]],
    content: ['', [Validators.required, Validators.minLength(10)]],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['article'] && this.article()) {
      this.articleForm.patchValue({
        title: this.article().title,
        summary: this.article().summary,
        content: this.article().content,
      });
    }
  }

  onSubmit() {
    if (!this.articleForm.valid) {
      return;
    }

    this.submitClicked.emit({
      ...this.articleForm.value,
      updatedAt: new Date(),
    } as IUpdateArticle);
  }
}
