import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IArticle } from '../articles.interface';
import { Empty } from '../../ui/empty/empty';
import { ArticleDetails } from '../article-details/article-details';
import { articleConverter } from '../articles.converter';

@Component({
  selector: 'app-article-details-page',
  imports: [ArticleDetails, AsyncPipe, Empty],
  templateUrl: './article-details-page.html',
  styleUrl: './article-details-page.scss',
})
export class ArticleDetailsPage {
  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  private router = inject(Router);

  article$: Observable<IArticle | undefined>;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id')!;
    const articleRef = doc(this.firestore, `articles/${id}`).withConverter(
      articleConverter
    );
    this.article$ = docData(articleRef, {
      idField: 'id',
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  edit() {
    // do zaimplementowania
  }

  delete() {
    // do zaimplementowania
  }
}
