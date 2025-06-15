import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
  private apiUrl = `${environment.apiUrl}/users`;
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
