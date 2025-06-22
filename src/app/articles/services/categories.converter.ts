import { DocumentData, FirestoreDataConverter } from '@angular/fire/firestore';
import { ICategory } from '../interfaces/categories.interface';

export const categoryConverter: FirestoreDataConverter<ICategory> = {
  toFirestore(category: ICategory): DocumentData {
    return {
      name: category.name,
      cdnUrl: category.cdnUrl,
    };
  },

  fromFirestore(snapshot, options): ICategory {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      name: data['name'],
      cdnUrl: data['cdnUrl'],
    };
  },
};
