import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Input } from '../../ui/forms/input/input';
import { AuthService } from '../auth-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ILoginPayload } from '../user.interface';
import { GENERAL_ERROR_MESSAGE } from '../../util/messages';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatButtonModule, Input],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async onSubmit() {
    const payload: ILoginPayload = this.loginForm.value as ILoginPayload;

    try {
      await this.authService.login(payload);
      this.toastr.success('Logged in');
      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);
      this.toastr.error(GENERAL_ERROR_MESSAGE);
    }
  }
}
