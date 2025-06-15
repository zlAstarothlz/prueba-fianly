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
        'pedrito@gmail.com',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      password: ['123456789', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    const formValue = this.loginForm.value;
    // console.log('Form submitted', formValue);
    if (this.loginForm.valid) {
      this.authService.login(formValue.email, formValue.password).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Inicio de sesión exitoso',
            text: 'Bienvenido',
           icon: 'success',
            position: 'top-end',
            timer: 3000,
            showConfirmButton: false,
          });
        this.router.navigate(['/products']);
        },
        error: (error) => {
          Swal.fire({
            title: 'Login Failed',
            text: 'Correo o contraseña inválidos. Por favor intenta de nuevo.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#fd823f',
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


