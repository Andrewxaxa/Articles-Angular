import {
  DocumentData,
  FirestoreDataConverter,
  Timestamp,
} from '@angular/fire/firestore';
import { IArticle } from './articles.interface';

export const articleConverter: FirestoreDataConverter<IArticle> = {
  toFirestore(article: IArticle): DocumentData {
    return {
      title: article.title,
      content: article.content,
      summary: article.summary,
      createdAt:
        article.createdAt instanceof Date
          ? Timestamp.fromDate(article.createdAt)
          : article.createdAt,
      updatedAt:
        article.updatedAt instanceof Date
          ? Timestamp.fromDate(article.updatedAt)
          : article.createdAt,
    };
  },
  fromFirestore(snapshot, options): IArticle {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      title: data['title'],
      content: data['content'],
      summary: data['summary'],
      createdAt: data['createdAt'].toDate(),
      updatedAt: data['updatedAt'].toDate(),
    };
  },
};
