import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Input } from '../../ui/forms/input/input';
import { AuthService } from '../auth-service';
import { ISignupPayload } from '../user.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GENERAL_ERROR_MESSAGE } from '../../util/messages';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, MatButtonModule, Input],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  signupForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async onSubmit() {
    const payload: ISignupPayload = this.signupForm.value as ISignupPayload;

    try {
      await this.authService.signup(payload);
      this.toastr.success('Signed up');
      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);
      this.toastr.error(GENERAL_ERROR_MESSAGE);
    }
  }
}
