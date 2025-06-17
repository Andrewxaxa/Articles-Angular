import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  GENERAL_ERROR_MESSAGE,
  REQUIRED_MESSAGE,
  TOO_SHORT_MESSAGE,
} from '../../util/messages';
import { Input } from '../../ui/forms/input/input';
import { Textarea } from '../../ui/forms/textarea/textarea';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { articleConverter } from '../articles.converter';
import { INewArticle } from '../articles.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ROUTES_CONFIG } from '../../routes.config';

@Component({
  selector: 'app-add-article',
  imports: [ReactiveFormsModule, MatButtonModule, Input, Textarea],
  templateUrl: './add-article.html',
  styleUrl: './add-article.scss',
})
export class AddArticle {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private firestore: Firestore = inject(Firestore);
  private toastr: ToastrService = inject(ToastrService);
  private router: Router = inject(Router);

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
    } as INewArticle;

    this.addArticle(payload);
  };

  async addArticle(payload: INewArticle) {
    const articleRef = collection(this.firestore, 'articles').withConverter(
      articleConverter
    );

    try {
      await addDoc(articleRef, payload);
      this.toastr.success('New article added');
      this.router.navigate(['/' + ROUTES_CONFIG.ARTICLES.path]);
    } catch (error) {
      console.error(error);
      this.toastr.error(GENERAL_ERROR_MESSAGE);
    }
  }
}
