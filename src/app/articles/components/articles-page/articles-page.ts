import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { EmptyPage } from '../../../ui/empty-page/empty-page';
import { LoadingPage } from '../../../ui/loading-page/loading-page';
import { Subject, takeUntil } from 'rxjs';
import { IArticle } from '../../interfaces/articles.interface';
import { ArticlesFirebaseService } from '../../services/articles-firebase-service';
import { ArticlesSearch } from '../articles-search/articles-search';

@Component({
  selector: 'app-articles',
  imports: [ArticlesSearch, EmptyPage, LoadingPage],
  templateUrl: './articles-page.html',
  styleUrl: './articles-page.scss',
})
export class ArticlesPage implements OnInit, OnDestroy {
  private articlesFirebaseService = inject(ArticlesFirebaseService);
  private destroy$ = new Subject<void>();
  readonly articles = signal<IArticle[]>([]);

  isLoading = signal(true);

  ngOnInit(): void {
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
