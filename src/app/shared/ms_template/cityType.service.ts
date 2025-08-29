import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

import { CityModel } from './../../models/ms_template/city-type';
import { cityModelTs } from '../../assets/template-test-data';

@Injectable({
  providedIn: 'root',
})
export class CityTypeService {

  private API = `${environment.msTemplatesUrl}/city-types`;
  private fallbackCities = cityModelTs;

  constructor(private http: HttpClient) {}

  getAll(): Observable<CityModel[]> {
    return this.http.get<CityModel[]>(this.API).pipe(
      map(data => data),
      catchError(error => {
        console.error('Error fetching cities:', error);
        return of(this.fallbackCities);
      })
    );
  }

  getById(id: number): Observable<CityModel> {
    return this.http.get<CityModel>(`${this.API}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching city with ID ${id}:`, error);
        return throwError(() => new Error(`Failed to fetch city with ID ${id}`));
      })
    );
  }

  create(city: CityModel): Observable<CityModel> {
    return this.http.post<CityModel>(this.API, city).pipe(
      catchError(error => {
        console.error('Error creating city:', error);
        return throwError(() => new Error('Failed to create city'));
      })
    );
  }
}
