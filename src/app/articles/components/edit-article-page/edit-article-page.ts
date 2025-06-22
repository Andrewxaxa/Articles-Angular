import { Component, inject, OnDestroy, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EditArticleForm } from '../edit-article-form/edit-article-form';
import { EmptyPage } from '../../../ui/empty-page/empty-page-page';
import { LoadingPage } from '../../../ui/loading-page/loading-page';
import { ArticlesFirebaseService } from '../../services/articles-firebase-service';
import { IArticle, IUpdateArticle } from '../../interfaces/articles.interface';
import { GENERAL_ERROR_MESSAGE } from '../../../util/messages';

@Component({
  selector: 'app-edit-article-page',
  imports: [EditArticleForm, EmptyPage, LoadingPage],
  templateUrl: './edit-article-page.html',
  styleUrl: './edit-article-page.scss',
})
export class EditArticlePage implements OnDestroy {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private articlesFirebaseService: ArticlesFirebaseService = inject(
    ArticlesFirebaseService
  );
  private toastr: ToastrService = inject(ToastrService);
  private destroy$ = new Subject<void>();
  readonly article = signal<IArticle | undefined>(undefined);
  readonly articleId = this.route.snapshot.paramMap.get('id')!;

  isLoading = signal(true);
  submitLoading = signal(false);

  constructor() {
    this.articlesFirebaseService
      .getArticle$(this.articleId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((article) => {
        this.article.set(article);
        this.isLoading.set(false);
      });
  }

  async editArticle(payload: IUpdateArticle) {
    try {
      this.submitLoading.set(true);
      await this.articlesFirebaseService.editArticle(this.articleId, payload);
      this.toastr.success('Article edited');
      this.router.navigate(['../'], { relativeTo: this.route });
    } catch (error) {
      console.error(error);
      this.toastr.error(GENERAL_ERROR_MESSAGE);
    } finally {
      this.submitLoading.set(false);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
