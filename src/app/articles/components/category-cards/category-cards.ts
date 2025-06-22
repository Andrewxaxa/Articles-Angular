import { Component, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ICategory } from '../../interfaces/categories.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-cards',
  imports: [MatCardModule],
  templateUrl: './category-cards.html',
  styleUrl: './category-cards.scss',
})
export class CategoryCards {
  router = inject(Router);
  route = inject(ActivatedRoute);

  categories = input.required<ICategory[]>();

  goToCategory(categoryName: string) {
    this.router.navigate([categoryName], { relativeTo: this.route });
  }
}
