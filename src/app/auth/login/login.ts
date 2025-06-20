import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Input } from '../../ui/forms/input/input';
import { AuthService } from '../auth-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ILoginPayload } from '../user.interface';
import { GENERAL_ERROR_MESSAGE } from '../../util/messages';
import { SpinnerButton } from '../../ui/spinner-button/spinner-button';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Input, SpinnerButton],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  isLoading = signal(false);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async onSubmit() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const payload: ILoginPayload = this.loginForm.value as ILoginPayload;

    try {
      this.isLoading.set(true);
      await this.authService.login(payload);
      this.toastr.success('Logged in');
      this.router.navigate(['/']);
    } catch (error) {
      if (error instanceof Error) {
        this.toastr.error(error.message);
      } else {
        this.toastr.error(GENERAL_ERROR_MESSAGE);
      }
    } finally {
      this.isLoading.set(false);
    }
  }
}
