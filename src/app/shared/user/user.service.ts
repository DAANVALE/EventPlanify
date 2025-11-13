import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { User } from '../../models/auth/user.model';
import { UserResponse } from '../../models/auth/user-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.apiUrl + '/user';

  constructor(private http: HttpClient) { }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/username/${username}`).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(userRequest: Partial<User>): Observable<UserResponse> {
    return this.http.put<UserResponse>(this.API_URL, userRequest).pipe(
      catchError(this.handleError)
    )
  }

  upgradeToHost(id: number): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.API_URL}/upgrade-to-host/${id}`, {}).pipe(
      catchError(this.handleError)
    );
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