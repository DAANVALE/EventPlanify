import { TerraceModel } from './../../models/ms_reserve/TerraceModel';

import { HttpClient } from '@angular/common/http';
import { catchError, Observable, map, throwError, of, find, tap, first} from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { ResponsePage } from '../../models/ResponsePage';

@Injectable({
  providedIn: 'root',
})
export class TerraceService{

  private API = environment.msReservesUrl + '/terrace';
  fallbackTerraceModel : TerraceModel[] = [];

  constructor(private http: HttpClient){

  }

  getAll(): Observable<TerraceModel[]>
  {
    return this.http.get<ResponsePage<TerraceModel[]>>(this.API).
    pipe(
      map( data => {
        this.fallbackTerraceModel = data.content;
        return data.content;
      }),
      catchError(error => {
        this.handleError(error);
        return this.loadLocalTerracesWithFallback();
      })
    );
  }

  getById(id: number): Observable<TerraceModel> {

    const fallback = this.fallbackTerraceModel.find(t => t.id === id);
    if (fallback != null) {
        return of(fallback);
    }

    return this.http.get<TerraceModel>(`${this.API}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching terrace type with ID ${id}:`, error);

        this.loadLocalTerracesWithFallback().pipe().subscribe();

        const fallback = this.fallbackTerraceModel.find(t => t.id === id)
                    || this.fallbackTerraceModel[0];

        return fallback ? of(fallback) : throwError(() => new Error(`Failed to fetch terrace type with ID ${id}`));
      })
    );
  }

  create(terraceType: TerraceModel): Observable<TerraceModel> {
    return this.http.post<TerraceModel>(this.API, terraceType).pipe(
      catchError(error => {
        console.error('Error creating terrace type:', error);
        return throwError(() => new Error('Failed to create terrace type'));
      })
    );
  }

  loadLocalTerraces(): Observable<TerraceModel[]> {
    return this.http.get<TerraceModel[]>('assets/reserve/terrace.json');
  }

  private loadLocalTerracesWithFallback(): Observable<TerraceModel[]> {
    return this.loadLocalTerraces().pipe(
      tap(data => {
        this.fallbackTerraceModel = data;
        console.warn('✅ Terraces locales cargados como fallback');
      }),
      catchError(localError => {
        this.handleError(localError);
        console.error('❌ Error cargando terraces locales:', localError);
        return of(this.fallbackTerraceModel);
      })
    );
  }

  private handleError(error: any): Observable<never>{
    return throwError(() => new Error('Something ocurried in TerraceService.', error));
  }

}
