import { Component, inject } from '@angular/core';
import { GENERAL_ERROR_MESSAGE } from '../../util/messages';
import {
  doc,
  docData,
  DocumentData,
  DocumentReference,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { articleConverter } from '../articles.converter';
import { IArticle, IUpdateArticle } from '../articles.interface';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EditArticleForm } from '../edit-article-form/edit-article-form';
import { AsyncPipe } from '@angular/common';
import { EmptyPage } from '../../ui/empty-page/empty-page-page';

@Component({
  selector: 'app-edit-article-page',
  imports: [AsyncPipe, EditArticleForm, EmptyPage],
  templateUrl: './edit-article-page.html',
  styleUrl: './edit-article-page.scss',
})
export class EditArticlePage {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private firestore: Firestore = inject(Firestore);
  private toastr: ToastrService = inject(ToastrService);

  articleId: string;
  article$: Observable<IArticle | undefined>;
  articleRef: DocumentReference<IArticle, DocumentData>;

  constructor() {
    this.articleId = this.route.snapshot.paramMap.get('id')!;
    this.articleRef = doc(
      this.firestore,
      `articles/${this.articleId}`
    ).withConverter(articleConverter);
    this.article$ = docData(this.articleRef, {
      idField: 'id',
    });
  }

  async editArticle(payload: IUpdateArticle) {
    try {
      await updateDoc(this.articleRef, { ...payload });
      this.toastr.success('Article edited');
      this.router.navigate(['../'], { relativeTo: this.route });
    } catch (error) {
      console.error(error);
      this.toastr.error(GENERAL_ERROR_MESSAGE);
    }
  }
}
