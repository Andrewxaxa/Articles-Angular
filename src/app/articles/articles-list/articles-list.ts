import { Component, input, linkedSignal, signal } from '@angular/core';
import { IArticle } from '../articles.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SearchField } from '../../ui/search-field/search-field';

@Component({
  selector: 'app-articles-list',
  imports: [MatCardModule, MatButton, RouterModule, SearchField],
  templateUrl: './articles-list.html',
  styleUrl: './articles-list.scss',
})
export class ArticlesList {
  articles = input.required<IArticle[]>();

  filteredArticles = linkedSignal(() => this.articles());

  onInputChanged(value: string) {
    const searchTerm = value.toLowerCase();

    this.filteredArticles.set(
      this.articles().filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm) ||
          article.summary.toLocaleLowerCase().includes(searchTerm) ||
          article.content.toLocaleLowerCase().includes(searchTerm)
      )
    );
  }
}
