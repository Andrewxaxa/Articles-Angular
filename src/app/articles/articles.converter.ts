import {
  DocumentData,
  FirestoreDataConverter,
  Timestamp,
} from '@angular/fire/firestore';
import { IArticle } from './articles.interface';

export const articleConverter: FirestoreDataConverter<IArticle> = {
  toFirestore(article: IArticle): DocumentData {
    return {
      userId: article.userId,
      title: article.title,
      summary: article.summary,
      content: article.content,
      category: article.category,
      cdnUrl: article.cdnUrl,
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
      userId: data['userId'],
      title: data['title'],
      summary: data['summary'],
      content: data['content'],
      category: data['category'],
      cdnUrl: data['cdnUrl'],
      createdAt: data['createdAt'].toDate(),
      updatedAt: data['updatedAt'].toDate(),
    };
  },
};
