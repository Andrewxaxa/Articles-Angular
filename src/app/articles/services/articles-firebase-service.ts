import { computed, inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  DocumentData,
  DocumentReference,
  Firestore,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { articleConverter } from './articles.converter';
import { Observable } from 'rxjs';
import {
  IArticle,
  INewArticle,
  IUpdateArticle,
} from '../interfaces/articles.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticlesFirebaseService {
  private firestore = inject(Firestore);

  private articlesCollection = collection(
    this.firestore,
    'articles'
  ).withConverter(articleConverter);

  private getArticleReference(
    articleId: string
  ): DocumentReference<IArticle, DocumentData> {
    return doc(this.firestore, 'articles', articleId).withConverter(
      articleConverter
    );
  }

  getArticles$(): Observable<IArticle[]> {
    return collectionData(this.articlesCollection, {
      idField: 'id',
    });
  }

  getUserArticles$(userId: string): Observable<IArticle[]> {
    const userArticlesQuery = query(
      this.articlesCollection,
      where('userId', '==', userId)
    );

    return collectionData(userArticlesQuery, { idField: 'id' });
  }

  getArticle$(articleId: string): Observable<IArticle | undefined> {
    const articleRef = this.getArticleReference(articleId);

    return docData(articleRef, {
      idField: 'id',
    });
  }

  addArticle(
    payload: INewArticle
  ): Promise<DocumentReference<INewArticle, DocumentData>> {
    return addDoc(this.articlesCollection, payload);
  }

  editArticle(articleId: string, payload: IUpdateArticle) {
    const articleRef = this.getArticleReference(articleId);

    return updateDoc(articleRef, { ...payload });
  }

  deleteArticle(articleId: string): Promise<void> {
    const articleRef = this.getArticleReference(articleId);

    return deleteDoc(articleRef);
  }
}
