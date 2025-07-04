import {
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { EditArticleForm } from '../edit-article-form/edit-article-form';
import { EmptyPage } from '../../../ui/empty-page/empty-page';
import { LoadingPage } from '../../../ui/loading-page/loading-page';
import { ArticlesFirebaseService } from '../../services/articles-firebase-service';
import { IArticle, IUpdateArticle } from '../../interfaces/articles.interface';
import { GENERAL_ERROR_MESSAGE } from '../../../util/messages';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-edit-article-page',
  imports: [EditArticleForm, EmptyPage, LoadingPage],
  templateUrl: './edit-article-page.html',
  styleUrl: './edit-article-page.scss',
})
export class EditArticlePage implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private articlesFirebaseService: ArticlesFirebaseService = inject(
    ArticlesFirebaseService
  );
  private toastr: ToastrService = inject(ToastrService);
  private destroyRef = inject(DestroyRef);

  readonly id = input('');
  readonly article = signal<IArticle | undefined>(undefined);

  isLoading = signal(true);
  submitLoading = signal(false);

  ngOnInit(): void {
    this.articlesFirebaseService
      .getArticle$(this.id())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (article) => {
          this.article.set(article);
          this.isLoading.set(false);
        },
        error: () => {
          this.article.set(undefined);
          this.isLoading.set(false);
        },
      });
  }

  async editArticle(payload: IUpdateArticle) {
    try {
      this.submitLoading.set(true);
      await this.articlesFirebaseService.editArticle(this.id(), payload);
      this.toastr.success('Article edited');
      this.router.navigate(['../'], { relativeTo: this.route });
    } catch (error) {
      console.error(error);
      this.toastr.error(GENERAL_ERROR_MESSAGE);
    } finally {
      this.submitLoading.set(false);
    }
  }
}
