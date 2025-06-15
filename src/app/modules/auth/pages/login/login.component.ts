import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm!: FormGroup;
  public hidePassword = true;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
 this.buildForm();
  }


  buildForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    const formValue = this.loginForm.value;
    // console.log('Form submitted', formValue);
    if (this.loginForm.valid) {
      this.authService.login(formValue.email, formValue.password).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Login Successful',
            text: 'Welcome back!',
           icon: 'success',
            position: 'top-end',
            timer: 3000,
          });
        this.router.navigate(['/products']);
        },
        error: (error) => {
          Swal.fire({
            title: 'Login Failed',
            text: 'Correo o constraseña inválidos. Por favor intenta de nuevo.',
            icon: 'error',
            confirmButtonText: 'OK',
          });

        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }
  goToRegister(): void {
    this.router.navigate(['/auth/register']);
  }
}


