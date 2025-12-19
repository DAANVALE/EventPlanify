import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, map, throwError, of, tap } from 'rxjs';
import { ClientModel } from '../../models/ms_reserve/ClientModel';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  private API = environment.msReservesUrl + '/client';
  clients: ClientModel[] = [];

  fallbackClient: ClientModel[] = [];

  constructor(private http: HttpClient) {}

  getAllActive(page = 0, size = 10): Observable<ClientModel[]> {
    return this.http
      .get<any>(`${this.API}?page=${page}&size=${size}`)
      .pipe(
        map(response => response.content || []),
        catchError(() => {
          return this.loadLocalClientsWithFallback().pipe(
            tap((data) =>
            { console.warn('✅ Cargando clients locales como fallback')
              this.fallbackClient = data.filter(a => a.killed == 0);
            },
            catchError(localError => {
              this.handleError(localError);
              console.error('❌ Error clients locales:', localError);
              return of(this.fallbackClient);
            })
          ));
        })
      );
  }

  getAll(page = 0, size = 10): Observable<ClientModel[]> {
    return this.http
      .get<any>(`${this.API}/all?page=${page}&size=${size}`)
      .pipe(
        map(response => response.content || []),
        catchError(error => {
          return this.loadLocalClientsWithFallback().pipe(
            tap((data) =>
            { console.warn('✅ Cargando clients locales como fallback')
              this.fallbackClient = data;
            },
            catchError(localError => {
              this.handleError(localError);
              console.error('❌ Error cargando clients locales:', localError);
              return of(this.fallbackClient);
            })
          ));
        })
      );
  }

  getById(id: number): Observable<ClientModel> {
    return this.http.get<ClientModel>(`${this.API}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching client with ID ${id}:`, error);
        const fallback = this.fallbackClient.find(t => t.id === id)
                        || this.fallbackClient[0];
        return of(fallback);
      })
    );
  }

  create(model: ClientModel): Observable<ClientModel> {
    return this.http.post<ClientModel>(this.API, model).pipe(
      catchError(error => {
        console.error('Error creating client:', error);
        return throwError(() => new Error('Failed to create client'));
      })
    );
  }

  delete(model: ClientModel): Observable<ClientModel> {
    return this.http.post<ClientModel>(`${this.API}/delete`, model).pipe(
      catchError(error => {
        console.error('Error deleting client:', error);
        return throwError(() => new Error('Failed to delete client'));
      })
    );
  }

  deleteById(id: number): Observable<ClientModel> {
    return this.http.post<ClientModel>(`${this.API}/delete/${id}`, {}).pipe(
      catchError(error => {
        console.error(`Error deleting client with ID ${id}:`, error);
        return throwError(() => new Error('Failed to delete client'));
      })
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Something went wrong in ClientService:', error);
    return throwError(() => new Error('Service error'));
  }

  loadLocalClients(): Observable<ClientModel[]> {
        return this.http.get<ClientModel[]>('assets/reserve/client.json');
      }
    
    private loadLocalClientsWithFallback(): Observable<ClientModel[]> {
      return this.loadLocalClients().pipe(
        tap(data => {
          this.fallbackClient = data;
          console.warn('✅ Clients locales cargados como fallback');
        }),
        catchError(localError => {
          this.handleError(localError);
          console.error('❌ Error cargando clients locales:', localError);
          return of(this.fallbackClient);
        })
      );
    }
}
