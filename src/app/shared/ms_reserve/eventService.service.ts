import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, map, throwError, of } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { EventModel } from '../../models/ms_reserve/EventModel';
// import { EventModelTs } from '../../assets/reserve-test-data';

@Injectable({
  providedIn: 'root',
})
export class EventService {

  private API = environment.msReservesUrl + '/event';
  events: EventModel[] = [];

  // Datos locales de fallback si el backend no responde
  fallbackEvents : EventModel[] = []; // EventModelTs;

  constructor(private http: HttpClient) {}

  /** 🔹 Obtener todos los eventos paginados */
  getAll(page = 0, size = 10): Observable<EventModel[]> {
    return this.http
      .get<any>(`${this.API}?page=${page}&size=${size}`)
      .pipe(
        map(response => response.content || []),
        catchError(error => {
          console.error('Error fetching events:', error);
          return of(this.fallbackEvents);
        })
      );
  }

  /** 🔹 Obtener evento por ID */
  getById(id: number): Observable<EventModel> {
    return this.http.get<EventModel>(`${this.API}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching event with ID ${id}:`, error);
        const fallback = this.fallbackEvents.find(e => e.id === id) || this.fallbackEvents[0];
        return of(fallback);
      })
    );
  }

  /** 🔹 Obtener eventos por cliente */
  getByClientId(clientId: number, page = 0, size = 10): Observable<EventModel[]> {
    return this.http
      .get<any>(`${this.API}/client/${clientId}?page=${page}&size=${size}`)
      .pipe(
        map(response => response.content || []),
        catchError(error => {
          console.error(`Error fetching events for client ${clientId}:`, error);
          return of(this.fallbackEvents);
        })
      );
  }

  /** 🔹 Obtener eventos por terraza */
  getByTerraceId(terraceId: number, page = 0, size = 10): Observable<EventModel[]> {
    return this.http
      .get<any>(`${this.API}/terrace/${terraceId}?page=${page}&size=${size}`)
      .pipe(
        map(response => response.content || []),
        catchError(error => {
          console.error(`Error fetching events for terrace ${terraceId}:`, error);
          return of(this.fallbackEvents);
        })
      );
  }

  /** 🔹 Crear nuevo evento (valida cliente, terraza, estado en backend) */
  create(event: EventModel): Observable<EventModel> {
    return this.http.post<EventModel>(this.API, event).pipe(
      catchError(error => {
        console.error('Error creating event:', error);
        return throwError(() => new Error('Failed to create event'));
      })
    );
  }

  /** 🔹 Eliminar evento por ID */
  deleteById(id: number): Observable<EventModel> {
    return this.http.post<EventModel>(`${this.API}/delete/${id}`, {}).pipe(
      catchError(error => {
        console.error(`Error deleting event with ID ${id}:`, error);
        return throwError(() => new Error('Failed to delete event'));
      })
    );
  }

  /** 🔹 Manejo general de errores */
  private handleError(error: any): Observable<never> {
    console.error('Something went wrong in EventService:', error);
    return throwError(() => new Error('Event service error'));
  }
}
