import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IArticle } from '../articles.interface';
import { articleConverter } from '../articles.converter';
import { ArticlesList } from '../articles-list/articles-list';
import { Empty } from '../../ui/empty/empty';

@Component({
  selector: 'app-articles',
  imports: [AsyncPipe, ArticlesList, Empty],
  templateUrl: './articles-page.html',
  styleUrl: './articles-page.scss',
})
export class ArticlesPage {
  firestore: Firestore = inject(Firestore);
  articles$: Observable<IArticle[]>;

  constructor() {
    const articlesCollection = collection(
      this.firestore,
      'articles'
    ).withConverter(articleConverter);
    this.articles$ = collectionData(articlesCollection, {
      idField: 'id',
    });
  }
}
