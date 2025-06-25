import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Navbar } from './navbar';
import { By } from '@angular/platform-browser';
import { ROUTES_CONFIG } from '../routes.config';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ComponentRef } from '@angular/core';
import { userMock } from '../util/mocks/auth.mock';

describe('Navbar Component', () => {
  let fixture: ComponentFixture<Navbar>;
  let component: Navbar;
  let componentRef: ComponentRef<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar, NoopAnimationsModule],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  it('should render static and dynamic nav links', () => {
    componentRef.setInput('user', userMock);
    componentRef.setInput('userDataLoading', false);
    fixture.detectChanges();

    const links = fixture.debugElement.queryAll(By.css('a.header-item'));
    expect(links.length).toBe(component.routes.length + 1);

    expect(links[0].nativeElement.textContent).toContain('Home');
    expect(links[1].nativeElement.textContent).toContain(
      ROUTES_CONFIG.ARTICLES.name
    );
  });

  it('should display login and signup buttons if user is null', () => {
    componentRef.setInput('user', null);
    componentRef.setInput('userDataLoading', false);
    fixture.detectChanges();

    const loginText = fixture.debugElement
      .queryAll(By.css('.action-button'))
      .map((de) => de.nativeElement.textContent);

    expect(
      loginText.some((text) => text.includes(ROUTES_CONFIG.LOGIN.name))
    ).toBeTrue();
    expect(
      loginText.some((text) => text.includes(ROUTES_CONFIG.SIGNUP.name))
    ).toBeTrue();
  });

  it('should display logout button when user is defined', () => {
    componentRef.setInput('user', userMock);
    componentRef.setInput('userDataLoading', false);
    fixture.detectChanges();

    const logoutButton = fixture.debugElement.query(
      By.css('button[mat-icon-button]')
    );
    expect(logoutButton).toBeTruthy();
  });

  it('should emit logoutClicked when logout button is clicked', () => {
    componentRef.setInput('user', userMock);
    componentRef.setInput('userDataLoading', false);
    spyOn(component.logoutClicked, 'emit');
    fixture.detectChanges();

    const button = fixture.debugElement.query(
      By.css('button[mat-icon-button]')
    );
    button.nativeElement.click();

    expect(component.logoutClicked.emit).toHaveBeenCalled();
  });

  it('should show loading spinner when userDataLoading is true', () => {
    componentRef.setInput('user', undefined);
    componentRef.setInput('userDataLoading', true);
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinner).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Loading user...');
  });
});
