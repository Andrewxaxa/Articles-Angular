import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { AuthService } from '../auth/auth-service';
import { signal } from '@angular/core';
import { IUser } from '../auth/user.interface';
import { By } from '@angular/platform-browser';

class AuthServiceMock {
  user = signal<IUser | null | undefined>(undefined);
}

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let authServiceMock: AuthServiceMock;

  beforeEach(async () => {
    authServiceMock = new AuthServiceMock();

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display welcome with username if user is logged in', () => {
    authServiceMock.user.set({
      uid: '1',
      email: 'test@example.com',
      username: 'TestUser',
    });
    fixture.detectChanges();

    const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(h1.textContent).toContain('Welcome,');
    expect(h1.textContent).toContain('TestUser');
  });

  it('should display GitHub link', () => {
    fixture.detectChanges();
    const link = fixture.debugElement.query(
      By.css('a.link-icon')
    ).nativeElement;

    expect(link.getAttribute('href')).toContain(
      'github.com/Andrewxaxa/Articles-Angular'
    );
    expect(link.textContent).toContain('GitHub');
  });

  it('should render the list of features', () => {
    fixture.detectChanges();
    const features = fixture.debugElement.queryAll(By.css('.features ul li'));
    expect(features.length).toBeGreaterThan(0);
  });

  it('should render the list of technologies', () => {
    fixture.detectChanges();
    const techs = fixture.debugElement.queryAll(By.css('.tech-list span'));
    expect(techs.length).toBeGreaterThan(0);
  });
});
