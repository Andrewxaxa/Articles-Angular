import { Component, input, linkedSignal } from '@angular/core';
import { SearchField } from '../../../ui/search-field/search-field';
import { IArticle } from '../../interfaces/articles.interface';
import { ArticlesList } from '../articles-list/articles-list';

@Component({
  selector: 'app-articles-search',
  imports: [SearchField, ArticlesList],
  templateUrl: './articles-search.html',
  styleUrl: './articles-search.scss',
})
export class ArticlesSearch {
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
