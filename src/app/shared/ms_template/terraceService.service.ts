import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

import { TerraceModel } from './../../models/ms_template/terrace';
import { terraceModelTs } from '../../assets/template-test-data';

@Injectable({
  providedIn: 'root',
})
export class TerraceService {

  private API = `${environment.msTemplatesUrl}/terrace`;
  private fallbackTerrace : TerraceModel[] = [];
  constructor(private http: HttpClient) {}

  loadLocalTerrace(): Observable<TerraceModel[]> {
      return this.http.get<TerraceModel[]>('assets/template/terrace.json'); // Ajusta la ruta
  }

  getAll(): Observable<TerraceModel[]> {
    return this.http.get<TerraceModel[]>(this.API).pipe(
      map(data => data),
      catchError(error => {
          return this.loadLocalTerrace().pipe(
          tap(data => {
            this.fallbackTerrace = data;
            console.warn('Terrace locales cargados:', this.fallbackTerrace);
          }),
          catchError(localError => {
            console.error('Error cargando terrace types locales:', localError);
            return of(this.fallbackTerrace.length > 0 ? this.fallbackTerrace : terraceModelTs);
          })
        );
      })
    );
  }

  getById(id: number): Observable<TerraceModel> {
    return this.http.get<TerraceModel>(`${this.API}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching city with ID ${id}:`, error);
        return throwError(() => new Error(`Failed to fetch city with ID ${id}`));
      })
    );
  }

  create(terrace: TerraceModel): Observable<TerraceModel> {
    return this.http.post<TerraceModel>(this.API, terrace).pipe(
      catchError(error => {
        console.error('Error creating city:', error);
        return throwError(() => new Error('Failed to create city'));
      })
    );
  }
}
