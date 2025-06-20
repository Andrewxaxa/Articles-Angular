import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IArticle } from '../articles.interface';
import { DatePipe } from '@angular/common';
import { IUser } from '../../auth/user.interface';

@Component({
  selector: 'app-article-details',
  imports: [
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './article-details.html',
  styleUrl: './article-details.scss',
})
export class ArticleDetails {
  article = input.required<IArticle>();
  user = input.required<IUser | undefined | null>();

  articleEditClicked = output();
  articleDeleteClicked = output();
}
