import { Component, inject, OnDestroy, signal } from '@angular/core';
import { GENERAL_ERROR_MESSAGE } from '../../util/messages';
import { IArticle, IUpdateArticle } from '../articles.interface';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EditArticleForm } from '../edit-article-form/edit-article-form';
import { EmptyPage } from '../../ui/empty-page/empty-page-page';
import { ArticlesFirebaseService } from '../articles-firebase-service';
import { LoadingPage } from '../../ui/loading-page/loading-page';

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
      await this.articlesFirebaseService.editArticle(this.articleId, payload);
      this.toastr.success('Article edited');
      this.router.navigate(['../'], { relativeTo: this.route });
    } catch (error) {
      console.error(error);
      this.toastr.error(GENERAL_ERROR_MESSAGE);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
