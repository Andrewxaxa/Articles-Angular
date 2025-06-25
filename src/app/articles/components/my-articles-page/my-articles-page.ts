import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ArticlesList } from '../articles-list/articles-list';
import { EmptyPage } from '../../../ui/empty-page/empty-page';
import { LoadingPage } from '../../../ui/loading-page/loading-page';
import { ArticlesFirebaseService } from '../../services/articles-firebase-service';
import { AuthService } from '../../../auth/auth-service';
import { IArticle } from '../../interfaces/articles.interface';

@Component({
  selector: 'app-my-articles-page',
  imports: [ArticlesList, EmptyPage, LoadingPage],
  templateUrl: './my-articles-page.html',
  styleUrl: './my-articles-page.scss',
})
export class MyArticlesPage implements OnInit, OnDestroy {
  private articlesFirebaseService = inject(ArticlesFirebaseService);
  private authService = inject(AuthService);
  private destroy$ = new Subject<void>();
  readonly articles = signal<IArticle[]>([]);

  isLoading = signal(true);

  get user() {
    return this.authService.user();
  }

  ngOnInit(): void {
    this.articlesFirebaseService
      .getUserArticles$(this.user!.uid)
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
