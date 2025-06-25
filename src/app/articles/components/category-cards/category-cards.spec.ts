import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryCards } from './category-cards';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentRef } from '@angular/core';
import { categoriesMock } from '../../../util/mocks/categories-mock';
import { By } from '@angular/platform-browser';

describe('CategoryCards', () => {
  let component: CategoryCards;
  let fixture: ComponentFixture<CategoryCards>;
  let componentRef: ComponentRef<CategoryCards>;

  let routerMock: jasmine.SpyObj<Router>;

  const mockRoute = {
    snapshot: {},
  } as ActivatedRoute;

  beforeEach(async () => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CategoryCards],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: mockRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryCards);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('categories', categoriesMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a card for each category', () => {
    const cards = fixture.debugElement.queryAll(By.css('.category-card'));
    expect(cards.length).toBe(categoriesMock.length);

    cards.forEach((card, index) => {
      const title = card.nativeElement.querySelector('mat-card-title');
      const img = card.nativeElement.querySelector('img');

      expect(title.textContent.trim()).toBe(categoriesMock[index].name);
      expect(img.src).toContain(categoriesMock[index].cdnUrl);
      expect(img.alt).toBe(categoriesMock[index].name);
    });
  });

  it('should navigate to category on card click', () => {
    const categoryCard = fixture.debugElement.query(By.css('.category-card'));
    categoryCard.nativeElement.click();

    expect(routerMock.navigate).toHaveBeenCalledWith([categoriesMock[0].name], {
      relativeTo: mockRoute,
    });
  });
});
