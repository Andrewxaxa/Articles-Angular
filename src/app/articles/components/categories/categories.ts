import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CategoriesFirebaseService } from '../../services/categories-firebase-service';
import { CategoryCards } from '../category-cards/category-cards';
import { ICategory } from '../../interfaces/categories.interface';
import { EmptyPage } from '../../../ui/empty-page/empty-page';
import { LoadingPage } from '../../../ui/loading-page/loading-page';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-categories',
  imports: [CategoryCards, EmptyPage, LoadingPage],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class CategoriesPage implements OnInit {
  private categoriesFirebaseService = inject(CategoriesFirebaseService);
  private destroyRef = inject(DestroyRef);

  categories = signal<ICategory[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.categoriesFirebaseService
      .getCategories$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (categories) => {
          this.categories.set(categories);
          this.isLoading.set(false);
        },
        error: () => {
          this.categories.set([]);
          this.isLoading.set(false);
        },
      });
  }
}
