import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialog } from './confirm-dialog';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { dialogDataMock } from '../../util/mocks/confirm-dialog-data-mock';

describe('ConfirmDialog', () => {
  let fixture: ComponentFixture<ConfirmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ConfirmDialog,
        MatDialogModule,
        MatButtonModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dialogDataMock },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialog);
    fixture.detectChanges();
  });

  it('should display the provided title and content', () => {
    const titleEl = fixture.debugElement.query(By.css('h2')).nativeElement;
    const contentEl = fixture.debugElement.query(
      By.css('mat-dialog-content')
    ).nativeElement;

    expect(titleEl.textContent).toContain(dialogDataMock.title);
    expect(contentEl.textContent).toContain(dialogDataMock.content);
  });

  it('should render No and Yes buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));

    expect(buttons.length).toBe(2);
    expect(buttons[0].nativeElement.textContent).toContain('No');
    expect(buttons[1].nativeElement.textContent).toContain('Yes');
  });
});
