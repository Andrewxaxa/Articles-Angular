import { Component, inject, OnDestroy, signal } from '@angular/core';
import { ArticlesList } from '../articles-list/articles-list';
import { EmptyPage } from '../../ui/empty-page/empty-page-page';
import { ArticlesFirebaseService } from '../articles-firebase-service';
import { LoadingPage } from '../../ui/loading-page/loading-page';
import { Subject, takeUntil } from 'rxjs';
import { IArticle } from '../articles.interface';

@Component({
  selector: 'app-articles',
  imports: [ArticlesList, EmptyPage, LoadingPage],
  templateUrl: './articles-page.html',
  styleUrl: './articles-page.scss',
})
export class ArticlesPage implements OnDestroy {
  private articlesFirebaseService = inject(ArticlesFirebaseService);
  private destroy$ = new Subject<void>();
  readonly articles = signal<IArticle[]>([]);
  isLoading = signal(true);

  constructor() {
    this.articlesFirebaseService
      .getArticles$()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (articles) => {
          this.articles.set(articles);
          this.isLoading.set(false);
        },
        error: () => {
          this.articles.set([]);
          this.isLoading.set(false);
        },
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
