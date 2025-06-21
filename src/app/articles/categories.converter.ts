import { DocumentData, FirestoreDataConverter } from '@angular/fire/firestore';
import { ICategory } from './categories.interface';

export const categoryConverter: FirestoreDataConverter<ICategory> = {
  toFirestore(category: ICategory): DocumentData {
    return {
      name: category.name,
    };
  },

  fromFirestore(snapshot, options): ICategory {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      name: data['name'],
    };
  },
};
