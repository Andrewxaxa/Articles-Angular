import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  deleteDoc,
  doc,
  docData,
  DocumentData,
  DocumentReference,
  Firestore,
} from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IArticle } from '../articles.interface';
import { EmptyPage } from '../../ui/empty-page/empty-page-page';
import { ArticleDetails } from '../article-details/article-details';
import { articleConverter } from '../articles.converter';
import { ToastrService } from 'ngx-toastr';
import { GENERAL_ERROR_MESSAGE } from '../../util/messages';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmDialog,
  ConfirmDialogData,
} from '../../ui/confirm-dialog/confirm-dialog';

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
  private toastr = inject(ToastrService);
  private dialog = inject(MatDialog);

  article$: Observable<IArticle | undefined>;
  articleRef: DocumentReference<IArticle, DocumentData>;

  constructor() {
    const articleId = this.route.snapshot.paramMap.get('id')!;
    this.articleRef = doc(
      this.firestore,
      `articles/${articleId}`
    ).withConverter(articleConverter);
    this.article$ = docData(this.articleRef, {
      idField: 'id',
    });
  }

  editArticle() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    const data: ConfirmDialogData = {
      title: 'Delete article',
      content: 'Do you want to delete this article?',
    };

    const dialogRef = this.dialog.open<
      ConfirmDialog,
      ConfirmDialogData,
      boolean
    >(ConfirmDialog, {
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.deleteArticle();
    });
  }

  async deleteArticle() {
    try {
      await deleteDoc(this.articleRef);
      this.toastr.success('Article deleted');
      this.router.navigate(['../'], { relativeTo: this.route });
    } catch (error) {
      console.error(error);
      this.toastr.error(GENERAL_ERROR_MESSAGE);
    }
  }
}
