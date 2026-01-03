import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

import { TerraceModel } from './../../models/ms_template/terrace';
import { terraceModelTs } from '../../assets/template-test-data';
import { ResponsePage } from '../../models/ResponsePage';

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
  return this.http.get<ResponsePage<TerraceModel[]>>(this.API).pipe(
    map(response => {
      this.fallbackTerrace = response.content;
      return response.content;
    }),
    catchError(error => {
      console.error('Error fetching terraces from API:', error);
      return this.loadLocalTerrace().pipe(
        tap(data => {
          this.fallbackTerrace = data; // Actualizar el fallback
          console.warn('✅ Terraces locales cargados:', this.fallbackTerrace);
        }),
        catchError(localError => {
          console.error('❌ Error cargando terraces locales:', localError);
          // Usar el fallback si existe, sino array vacío
          return of(this.fallbackTerrace && this.fallbackTerrace.length > 0 ? this.fallbackTerrace : []);
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

  getByIdTerraceDB(idTerraceDB: number): Observable<TerraceModel> {
       return this.http.get<TerraceModel>(`${this.API}/terrace-db/${idTerraceDB}`).pipe(
         catchError(error => {
           console.error(`Error fetching Service with idService_DB ${idTerraceDB}:`, error);
           const fallback = this.fallbackTerrace.find(s => s.idTerraceDB = idTerraceDB) || this.fallbackTerrace[0];
           return of(fallback);
         })
       );
     }

  getByIdAsociateTerraceDB(idTerraceDB: number): Observable<TerraceModel> {
    return this.http.get<TerraceModel>(`${this.API}/asociate-terrace-db/${idTerraceDB}`).pipe(
      catchError(error => {
        console.error(`Error fetching Service with idService_DB ${idTerraceDB}:`, error);
        const fallback = this.fallbackTerrace.find(s => s.idTerraceDB = idTerraceDB) || this.fallbackTerrace[0];
        return of(fallback);
      })
    );
  }

  getByTerraceTypeId(terraceTypeId: number): Observable<TerraceModel[]> {
    return this.http.get<TerraceModel[]>(`${this.API}/TerraceType/${terraceTypeId}`).pipe(
      catchError(error => {
        return this.loadLocalTerrace().pipe(
            map((data) => {
              this.fallbackTerrace = data; // Actualizar el fallback
              const filtered = this.fallbackTerrace.filter(t => t.terraceType.some(x => x.id === terraceTypeId));
              this.fallbackTerrace = filtered;
              console.warn('✅ Terraces locales cargados para Terrace Type ID:', terraceTypeId, filtered);
              return filtered;
            }),
          catchError(localError => {
            console.error('❌ Error cargando terraces locales para Terrace Type ID:', terraceTypeId, localError);
            const filtered = this.fallbackTerrace && this.fallbackTerrace.length > 0
              ? this.fallbackTerrace.filter(t => t.terraceType && t.terraceType.some(x => x.id === terraceTypeId))
              : [];
            return of(filtered);
          })
        );
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
