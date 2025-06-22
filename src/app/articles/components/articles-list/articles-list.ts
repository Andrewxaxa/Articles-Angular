import { Component, input } from '@angular/core';
import { IArticle } from '../../interfaces/articles.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-articles-list',
  imports: [MatCardModule, MatButton, RouterModule],
  templateUrl: './articles-list.html',
  styleUrl: './articles-list.scss',
})
export class ArticlesList {
  articles = input.required<IArticle[]>();
}
