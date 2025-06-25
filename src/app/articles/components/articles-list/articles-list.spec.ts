import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticlesList } from './articles-list';
import { ComponentRef } from '@angular/core';
import { articlesMock } from '../../../util/mocks/articles-mock';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { MatButton } from '@angular/material/button';

describe('ArticlesList', () => {
  let component: ArticlesList;
  let fixture: ComponentFixture<ArticlesList>;
  let componentRef: ComponentRef<ArticlesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesList],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlesList);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('articles', articlesMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all articles', () => {
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(cards.length).toBe(articlesMock.length);
  });

  it('should render article titles and summaries', () => {
    const titles = fixture.debugElement.queryAll(By.css('mat-card-title'));
    const summaries = fixture.debugElement.queryAll(By.css('.summary'));

    expect(titles.length).toBe(3);
    expect(titles[0].nativeElement.textContent).toContain('testTitle1');
    expect(titles[1].nativeElement.textContent).toContain('testTitle2');

    expect(summaries[0].nativeElement.textContent).toContain('testSummary1');
    expect(summaries[1].nativeElement.textContent).toContain('testSummary2');
  });

  it('should render article images with correct src', () => {
    const images = fixture.debugElement.queryAll(By.css('.article-image'));
    expect(images.length).toBe(3);
    expect(images[0].nativeElement.getAttribute('src')).toBe('testUrl1');
    expect(images[1].nativeElement.getAttribute('src')).toBe('testUrl2');
  });

  it('should render "Read more" buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(MatButton));
    expect(buttons.length).toBe(3);
  });
});
