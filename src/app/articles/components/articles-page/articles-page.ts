import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { EmptyPage } from '../../../ui/empty-page/empty-page';
import { LoadingPage } from '../../../ui/loading-page/loading-page';
import { IArticle } from '../../interfaces/articles.interface';
import { ArticlesFirebaseService } from '../../services/articles-firebase-service';
import { ArticlesSearch } from '../articles-search/articles-search';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-articles',
  imports: [ArticlesSearch, EmptyPage, LoadingPage],
  templateUrl: './articles-page.html',
  styleUrl: './articles-page.scss',
})
export class ArticlesPage implements OnInit {
  private articlesFirebaseService = inject(ArticlesFirebaseService);
  private destroyRef = inject(DestroyRef);
  readonly articles = signal<IArticle[]>([]);

  isLoading = signal(true);

  ngOnInit(): void {
    this.articlesFirebaseService
      .getArticles$()
      .pipe(takeUntilDestroyed(this.destroyRef))
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
}
