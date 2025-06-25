import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CategoriesFirebaseService } from '../../services/categories-firebase-service';
import { CategoryCards } from '../category-cards/category-cards';
import { Subject, takeUntil } from 'rxjs';
import { ICategory } from '../../interfaces/categories.interface';
import { EmptyPage } from '../../../ui/empty-page/empty-page';
import { LoadingPage } from '../../../ui/loading-page/loading-page';

@Component({
  selector: 'app-categories',
  imports: [CategoryCards, EmptyPage, LoadingPage],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class CategoriesPage implements OnInit, OnDestroy {
  private categoriesFirebaseService = inject(CategoriesFirebaseService);
  private destroy$ = new Subject<void>();

  categories = signal<ICategory[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.categoriesFirebaseService
      .getCategories$()
      .pipe(takeUntil(this.destroy$))
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
