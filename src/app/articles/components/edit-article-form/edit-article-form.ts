import {
  Component,
  inject,
  input,
  OnChanges,
  output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Textarea } from '../../../ui/forms/textarea/textarea';
import { SpinnerButton } from '../../../ui/spinner-button/spinner-button';
import { IArticle, IUpdateArticle } from '../../interfaces/articles.interface';
import { Input } from '../../../ui/forms/input/input';

@Component({
  selector: 'app-edit-article-form',
  imports: [ReactiveFormsModule, Input, Textarea, SpinnerButton],
  templateUrl: './edit-article-form.html',
  styleUrl: './edit-article-form.scss',
})
export class EditArticleForm implements OnChanges {
  private formBuilder: FormBuilder = inject(FormBuilder);

  article = input.required<IArticle>();
  isLoading = input.required<boolean>();
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
      this.articleForm.markAllAsTouched();
      return;
    }

    this.submitClicked.emit({
      ...this.articleForm.value,
      updatedAt: new Date(),
    } as IUpdateArticle);
  }
}
