// import { Injectable } from '@angular/core';
// import { delay, of, tap } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   public token: string | null = null;
//   public user: any = null;

//   constructor() {}

//   login(username: string, password: string) {
//     return of({
//       success: true,
//       token: 'fake-jwt-token',
//       user: {
//         id: 1,
//         username: username,
//         email: 'example.com',
//       },
//     }).pipe(
//       tap((response) => {
//         // Simulate storing the token in local storage
//         this.token = response.token;
//         this.user = response.user;
//         localStorage.setItem('token', response.token);
//         localStorage.setItem('user', JSON.stringify(response.user));
//       }),delay(1000) // Simulate network delay
//     );
//   }
//   register(data: string) {
//     return of({
//       success: true,
//       token: 'fake-jwt-token',
//       user: {
//         id: 1,
//         data: 'data',
//         email: 'example.com',
//       },
//     });
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  dateBirth: string;
  gender: string;
  interests: { value: string; text: string }[];
  country: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // mock API users endpoint
  token: any;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map((users) => {
        const matchedUser = users.find(
          (user) => user.email === email && user.password === password
        );

        if (!matchedUser) {
          throw new Error('Credenciales incorrectas');
        }

        localStorage.setItem('user', JSON.stringify(matchedUser));
        return matchedUser;
      }),
      catchError(() => {
        return throwError(() => new Error('Error al iniciar sesión'));
      })
    );
  }

  register(newUser: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, newUser);
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
