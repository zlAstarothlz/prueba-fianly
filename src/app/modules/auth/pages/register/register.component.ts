import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CountryService } from '../../../../shared/services/country.service';
import { Country } from 'src/app/shared/interfaces/country.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { Observable } from 'rxjs';

interface InputInfo {
  value: string;
  text: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private countryService = inject(CountryService);
  public countries: Country[] = [];
  public countriesCopy: Country[] = [];
  public filterCountry = '';
  public submitted = false;
  public emailForm!: FormGroup;
  customInterestCtrl = new FormControl('');
  public minDate!: Date;
  public maxDate!: Date;
  public registerForm!: FormGroup;
  public hidePassword = true;
  public genders: InputInfo[] = [
    {
      value: 'female',
      text: 'Femenino',
    },
    {
      value: 'male',
      text: 'Masculino',
    },
    {
      value: 'other',
      text: 'Otro',
    },
  ];
  public interests: InputInfo[] = [
    {
      value: 'sports',
      text: 'Deportes',
    },
    {
      value: 'music',
      text: 'Música',
    },
    {
      value: 'movies',
      text: 'Películas',
    },
    {
      value: 'books',
      text: 'Libros',
    },
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly userService: UserService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 110, 0, 1);
    this.maxDate = new Date(currentYear - 3, 0, 1);

    this.buildForm();
  }
  ngOnInit(): void {
    this.countryService.getCountries().subscribe((response) => {
      this.countries = response;
      this.countriesCopy = [...this.countries];
    });
  }

  buildForm() {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required]],
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
        confirmPassword: ['', [Validators.required]],
        dateBirth: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        interests: this.fb.array([], Validators.required),
        country: [''],
      },
      {
        validators: this.matchPassword,
      }
    );
  }
  get interestsFormArray(): FormArray {
    return this.registerForm.get('interests') as FormArray;
  }
  isSelected(value: string): boolean {
    return this.interestsFormArray.value.some(
      (i: InputInfo) => i.value === value
    );
  }

  onCheckboxChange(event: any, interest: InputInfo) {
    const interests = this.interestsFormArray;
    if (event.checked) {
      interests.push(this.fb.control(interest));
    } else {
      const index = interests.controls.findIndex(
        (ctrl) => ctrl.value.value === interest.value
      );
      if (index !== -1) interests.removeAt(index);
    }
  }

  addCustomInterest() {
    const text = this.customInterestCtrl.value?.trim();
    if (!text) return;

    const customInterest: InputInfo = {
      value: text.toLowerCase().replace(/\s+/g, '_'),
      text,
    };

    if (!this.isSelected(customInterest.value)) {
      this.interests.push(customInterest);
      this.interestsFormArray.push(this.fb.control(customInterest));
    }

    this.customInterestCtrl.reset();
  }

  onSubmit() {

      this.submitted = true;

  if (this.registerForm.invalid) return;

  const formValue = this.registerForm.value;

  const newUser = {
    name: formValue.name,
    email: formValue.email,
    password: formValue.password,
    dateBirth: formValue.dateBirth,
    gender: formValue.gender,
    interests: formValue.interests,
    country: formValue.country
  };

  this.userService.register(newUser).subscribe({
    next: (response) => {
      console.log('Usuario registrado:', response);
      alert('¡Registro exitoso!');
      this.router.navigate(['/auth/login']);
    },
    error: (err) => {
      console.error('Error al registrar:', err);
      alert('Ocurrió un error al registrar el usuario');
    }
  });
  }

  matchPassword(group: AbstractControl): { [key: string]: any } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  filterCountries(): void {
    const filterValue = this.filterCountry.trim().toLocaleLowerCase();
    this.countriesCopy = this.countries.filter((field) =>
      field.name.common.trim().toLocaleLowerCase().includes(filterValue)
    );

  }
  cleanSearchFields(): void {
    this.filterCountry = '';
    this.filterCountries();
  }
}
