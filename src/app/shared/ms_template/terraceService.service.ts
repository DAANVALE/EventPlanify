import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

import { TerraceModel } from './../../models/ms_template/terrace';
import { terraceModelTs } from '../../assets/test-data';

@Injectable({
  providedIn: 'root',
})
export class TerraceService {

  private API = `${environment.msTemplatesUrl}/terrace`;
  private fallbackCities = terraceModelTs;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TerraceModel[]> {
    return this.http.get<TerraceModel[]>(this.API).pipe(
      map(data => data),
      catchError(error => {
        console.error('Error fetching cities:', error);
        return of(this.fallbackCities);
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
