import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Input } from '../../ui/forms/input/input';
import { AuthService } from '../auth-service';
import { ISignupPayload } from '../user.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GENERAL_ERROR_MESSAGE } from '../../util/messages';
import { SpinnerButton } from '../../ui/spinner-button/spinner-button';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, Input, SpinnerButton],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  isLoading = signal(false);

  signupForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async onSubmit() {
    if (!this.signupForm.valid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const payload: ISignupPayload = this.signupForm.value as ISignupPayload;

    try {
      this.isLoading.set(true);
      await this.authService.signup(payload);
      this.toastr.success('Signed up');
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
