import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GENERAL_ERROR_MESSAGE } from '../../util/messages';
import { Input } from '../../ui/forms/input/input';
import { Textarea } from '../../ui/forms/textarea/textarea';
import { INewArticle } from '../articles.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ROUTES_CONFIG } from '../../routes.config';
import { ArticlesFirebaseService } from '../articles-firebase-service';
import { SpinnerButton } from '../../ui/spinner-button/spinner-button';
import { UploaderRegularViewComponent } from '../../uploader/regular-view/uploader-regular-view.component';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-add-article',
  imports: [
    ReactiveFormsModule,
    Input,
    Textarea,
    SpinnerButton,
    UploaderRegularViewComponent,
  ],
  templateUrl: './add-article.html',
  styleUrl: './add-article.scss',
})
export class AddArticle {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private articlesFirebaseService: ArticlesFirebaseService = inject(
    ArticlesFirebaseService
  );
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private authService = inject(AuthService);
  submitLoading = signal(false);

  articleForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    summary: ['', [Validators.required, Validators.minLength(5)]],
    content: ['', [Validators.required, Validators.minLength(10)]],
    cdnUrl: [''],
  });

  get user() {
    return this.authService.user;
  }

  onFileUploaded(cdnUrl: string) {
    this.articleForm.get('cdnUrl')?.setValue(cdnUrl);
  }

  onFileRemoved() {
    this.articleForm.get('cdnUrl')?.setValue('');
  }

  onSubmit() {
    if (!this.articleForm.valid) {
      this.articleForm.markAllAsTouched();
      return;
    }

    // if (!this.articleForm.get('cdnUrl')?.value) {
    //   this.toastr.warning('Please upload image for your article');
    //   return;
    // }

    const payload = {
      ...this.articleForm.value,
      userId: this.user()!.uid,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as INewArticle;

    this.addArticle(payload);
  }

  async addArticle(payload: INewArticle) {
    try {
      this.submitLoading.set(true);
      await this.articlesFirebaseService.addArticle(payload);
      this.toastr.success('New article added');
      this.router.navigate(['/' + ROUTES_CONFIG.ARTICLES.path]);
    } catch (error) {
      console.error(error);
      this.toastr.error(GENERAL_ERROR_MESSAGE);
    } finally {
      this.submitLoading.set(false);
    }
  }
}
