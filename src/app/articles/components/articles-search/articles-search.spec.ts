import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticlesSearch } from './articles-search';
import { ComponentRef } from '@angular/core';
import { articlesMock } from '../../../util/mocks/articles-mock';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { ArticlesList } from '../articles-list/articles-list';

describe('ArticlesSearch', () => {
  let component: ArticlesSearch;
  let fixture: ComponentFixture<ArticlesSearch>;
  let componentRef: ComponentRef<ArticlesSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesSearch],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlesSearch);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('articles', articlesMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initially show all articles', () => {
    const articlesList = fixture.debugElement.query(
      By.directive(ArticlesList)
    )?.componentInstance;

    expect(articlesList.articles().length).toBe(articlesMock.length);
  });

  it('should filter articles when input is changed', () => {
    const searchTerm = 'testTitle2';
    component.onInputChanged(searchTerm);
    fixture.detectChanges();

    const filtered = component.filteredArticles();
    expect(filtered.length).toBe(1);
    expect(filtered[0].title.toLowerCase()).toContain(
      searchTerm.toLocaleLowerCase()
    );
  });

  it('should show no articles when search term does not match', () => {
    component.onInputChanged('no-match');
    fixture.detectChanges();

    expect(component.filteredArticles().length).toBe(0);

    const articlesList = fixture.debugElement.query(
      By.directive(ArticlesList)
    )?.componentInstance;

    expect(articlesList.articles().length).toBe(0);
  });

  it('should pass filtered articles to ArticlesList', () => {
    const searchTerm = 'testTitle2';
    component.onInputChanged(searchTerm);
    fixture.detectChanges();

    const articlesList = fixture.debugElement.query(
      By.directive(ArticlesList)
    )?.componentInstance;

    expect(articlesList.articles().length).toBe(1);
    expect(articlesList.articles()[0].title.toLowerCase()).toContain(
      searchTerm.toLocaleLowerCase()
    );
  });
});
