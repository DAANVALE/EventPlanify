import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

import { CityModel } from './../../models/ms_template/city-type';
import { cityModelTs } from '../../assets/template-test-data';

@Injectable({
  providedIn: 'root',
})
export class CityTypeService {

  private API = `${environment.msTemplatesUrl}/city-types`;
  private cityModel: CityModel[] = [];

  constructor(private http: HttpClient) {}

// Método para cargar ciudades del JSON local
  loadLocalCities(): Observable<CityModel[]> {
    return this.http.get<CityModel[]>('assets/template/cities.json'); // Ajusta la ruta
  }

  getAll(): Observable<CityModel[]> {
    return this.http.get<CityModel[]>(this.API).pipe(
      map((data: CityModel[]) => {
        // Actualizar el modelo global cuando la API funciona
        this.cityModel = data;
        return data;
      }),
      catchError(error => {
        console.error('Error fetching cities:', error);
        // Retornar el Observable del JSON y actualizar el modelo global
        return this.loadLocalCities().pipe(
          tap(data => {
            this.cityModel = data; // Actualizar aquí también
            console.log('Ciudades locales cargadas:', this.cityModel);
          }),
          catchError(localError => {
            console.error('Error cargando ciudades locales:', localError);
            return of(this.cityModel.length > 0 ? this.cityModel : cityModelTs);
          })
        );
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
