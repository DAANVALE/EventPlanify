import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, throwError, catchError, tap, map } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { LoginRequest } from '../../models/auth/login-request.model';
import { RegisterRequest } from '../../models/auth/register-request.model';
import { AuthResponse } from '../../models/auth/auth-response.model';
import { getUsernameFromToken } from './jwt-utility';
import { UserService } from '../user/user.service';
import { User } from '../../models/auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn = signal<boolean>(false);
  currentUsername = signal<string | null>(null);
  userProfile = signal<Partial<User> | null>(null); 

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    this.checkSessionStatus();
  }

  private checkSessionStatus(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      const username = getUsernameFromToken(token);
      if (username) {
        this.currentUserLoginOn.set(true);
        this.currentUsername.set(username);
        this.fetchUserProfile(username); 
        return;
      }
    }
    this.clearSession();
  }

  login(credentials: LoginRequest): Observable<string> {
    const url = environment.authUrl + '/login';
    return this.http.post<AuthResponse>(url, credentials).pipe(
      tap((response) => {
        const token = response.token;
        sessionStorage.setItem("token", token);
        const username = getUsernameFromToken(token);
        if (username) {
          this.currentUserLoginOn.set(true);
          this.currentUsername.set(username);
          this.fetchUserProfile(username);
        }
      }),
      map((response) => response.token),
      catchError(this.handleError)
    );
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    const url = environment.authUrl + '/register';
    return this.http.post<AuthResponse>(url, request).pipe(
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.clearSession();
  }

  private clearSession(): void {
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.set(false);
    this.currentUsername.set(null);
    this.userProfile.set(null);
  }

  fetchUserProfile(username: string): void {
    this.userService.getUserByUsername(username).subscribe({
      next: (user) => {
        this.userProfile.set(user);
        sessionStorage.setItem("id", user.id.toString());
      },
      error: (err) => console.error('Error al cargar perfil de usuario:', err),
    });
  }

  public refreshUserProfile(): void {
    const username = this.currentUsername();
    if (username) {
      this.fetchUserProfile(username);
    }
  }
  
  get userToken(): string {
    return sessionStorage.getItem('token') || '';
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Algo falló. Por favor intente nuevamente.';
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (typeof error.error === 'string') {
      errorMessage = error.error;
    }
    return throwError(() => errorMessage);
  }
}