import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { categoryConverter } from './categories.converter';
import { ICategory } from '../interfaces/categories.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesFirebaseService {
  private firestore = inject(Firestore);

  private categoriesCollection = collection(
    this.firestore,
    'categories'
  ).withConverter(categoryConverter);

  getCategories$(): Observable<ICategory[]> {
    return collectionData(this.categoriesCollection, {
      idField: 'id',
    }) as Observable<ICategory[]>;
  }
}
