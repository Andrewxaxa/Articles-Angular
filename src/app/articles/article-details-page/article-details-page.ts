import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IArticle } from '../articles.interface';
import { EmptyPage } from '../../ui/empty-page/empty-page-page';
import { ArticleDetails } from '../article-details/article-details';
import { articleConverter } from '../articles.converter';

@Component({
  selector: 'app-article-details-page',
  imports: [ArticleDetails, AsyncPipe, EmptyPage],
  templateUrl: './article-details-page.html',
  styleUrl: './article-details-page.scss',
})
export class ArticleDetailsPage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private firestore = inject(Firestore);

  articleId: string;
  article$: Observable<IArticle | undefined>;

  constructor() {
    this.articleId = this.route.snapshot.paramMap.get('id')!;
    const articleRef = doc(
      this.firestore,
      `articles/${this.articleId}`
    ).withConverter(articleConverter);
    this.article$ = docData(articleRef, {
      idField: 'id',
    });
  }

  editArticle() {
    this.router.navigate(['articles', this.articleId, 'edit']);
  }

  deleteArticle() {
    // do zaimplementowania
  }
}
