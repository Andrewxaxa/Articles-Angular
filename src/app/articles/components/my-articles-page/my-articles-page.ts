import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ArticlesList } from '../articles-list/articles-list';
import { EmptyPage } from '../../../ui/empty-page/empty-page';
import { LoadingPage } from '../../../ui/loading-page/loading-page';
import { ArticlesFirebaseService } from '../../services/articles-firebase-service';
import { AuthService } from '../../../auth/auth-service';
import { IArticle } from '../../interfaces/articles.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-my-articles-page',
  imports: [ArticlesList, EmptyPage, LoadingPage],
  templateUrl: './my-articles-page.html',
  styleUrl: './my-articles-page.scss',
})
export class MyArticlesPage implements OnInit {
  private articlesFirebaseService = inject(ArticlesFirebaseService);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  readonly articles = signal<IArticle[]>([]);

  isLoading = signal(true);

  get user() {
    return this.authService.user();
  }

  ngOnInit(): void {
    this.articlesFirebaseService
      .getUserArticles$(this.user!.uid)
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
