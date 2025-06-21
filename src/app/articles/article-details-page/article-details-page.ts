import { Component, inject, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IArticle } from '../articles.interface';
import { EmptyPage } from '../../ui/empty-page/empty-page-page';
import { ArticleDetails } from '../article-details/article-details';
import { ToastrService } from 'ngx-toastr';
import { GENERAL_ERROR_MESSAGE } from '../../util/messages';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmDialog,
  ConfirmDialogData,
} from '../../ui/confirm-dialog/confirm-dialog';
import { ArticlesFirebaseService } from '../articles-firebase-service';
import { LoadingPage } from '../../ui/loading-page/loading-page';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-article-details-page',
  imports: [ArticleDetails, EmptyPage, LoadingPage],
  templateUrl: './article-details-page.html',
  styleUrl: './article-details-page.scss',
})
export class ArticleDetailsPage implements OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private articlesFirebaseService = inject(ArticlesFirebaseService);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private dialog = inject(MatDialog);
  private destroy$ = new Subject<void>();
  readonly article = signal<IArticle | undefined>(undefined);
  readonly articleId = this.route.snapshot.paramMap.get('id')!;
  isCreator = signal(false);
  isLoading = signal(true);

  constructor() {
    this.articlesFirebaseService
      .getArticle$(this.articleId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((article) => {
        if (!article?.id) {
          this.isLoading.set(false);
          return;
        }

        this.article.set(article);
        this.isCreator.set(this.authService.isCreator(article.userId));
        this.isLoading.set(false);
      });
  }

  editArticle() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    const data: ConfirmDialogData = {
      title: 'Delete article',
      content: 'Do you want to delete this article?',
    };

    const dialogRef = this.dialog.open<
      ConfirmDialog,
      ConfirmDialogData,
      boolean
    >(ConfirmDialog, {
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.deleteArticle();
    });
  }

  openConfirmModal() {
    const data: ConfirmDialogData = {
      title: 'Delete article',
      content: 'Do you want to delete this article?',
    };

    const dialogRef = this.dialog.open<
      ConfirmDialog,
      ConfirmDialogData,
      boolean
    >(ConfirmDialog, {
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.deleteArticle();
    });
  }

  async deleteArticle() {
    try {
      this.isLoading.set(true);
      await this.articlesFirebaseService.deleteArticle(this.articleId);
      this.toastr.success('Article deleted');
      this.router.navigate(['../'], { relativeTo: this.route });
    } catch (error) {
      console.error(error);
      this.toastr.error(GENERAL_ERROR_MESSAGE);
    } finally {
      this.isLoading.set(false);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
