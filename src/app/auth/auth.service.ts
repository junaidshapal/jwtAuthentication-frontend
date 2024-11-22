import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7111/api/Auth';
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  // Register User
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  //Login with credentials
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        console.log('Login successful', response);
        if (response.token) {
          localStorage.setItem('jwtToken', response.token);
        }
        return response;
      }),
      catchError((err) => {
        console.error('Login error:', err);
        return throwError(err);
      })
    );
  }

   // Logout User
   logout(): void {
    localStorage.removeItem('jwtToken');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('jwtToken');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwtToken');
  }
  

  // Get token
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
}
