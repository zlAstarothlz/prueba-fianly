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
    private readonly router: Router
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
    console.log('Form submitted', formValue);
  }
  goToRegister(): void {
    this.router.navigate(['/auth/register']);
  }
}
