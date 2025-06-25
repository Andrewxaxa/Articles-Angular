import {
  Component,
  inject,
  linkedSignal,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ArticlesFirebaseService } from '../../services/articles-firebase-service';
import { Subject, takeUntil } from 'rxjs';
import { IArticle } from '../../interfaces/articles.interface';
import { EmptyPage } from '../../../ui/empty-page/empty-page';
import { LoadingPage } from '../../../ui/loading-page/loading-page';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesList } from '../articles-list/articles-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-category-articles-page',
  imports: [
    ArticlesList,
    MatButtonModule,
    MatIconModule,
    EmptyPage,
    LoadingPage,
  ],
  templateUrl: './category-articles-page.html',
  styleUrl: './category-articles-page.scss',
})
export class CategoryArticlesPage implements OnInit, OnDestroy {
  private articlesFirebaseService = inject(ArticlesFirebaseService);
  private destroy$ = new Subject<void>();
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  readonly categoryName = this.route.snapshot.paramMap.get('name');
  readonly articles = signal<IArticle[]>([]);

  filteredArticles = linkedSignal(() => {
    return this.articles().filter(
      (article) => article.category === this.categoryName!
    );
  });
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

  onBackClicked() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
