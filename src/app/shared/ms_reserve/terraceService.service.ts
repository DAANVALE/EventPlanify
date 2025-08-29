import { TerraceModel } from './../../models/ms_reserve/TerraceModel';

import { HttpClient } from '@angular/common/http';
import { catchError, Observable, map, throwError, of, find} from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';

import { terraceModelTs } from '../../assets/reserve-test-data';
import { terraceTypeTs } from '../../assets/template-test-data';


@Injectable({
  providedIn: 'root',
})
export class TerraceService{

  private API = environment.msReservesUrl + '/terrace';
  terraceModel: TerraceModel[] = [];

  fallbackTerraceModel = terraceModelTs;

  constructor(private http: HttpClient){

  }

  getAll(): Observable<TerraceModel[]>
  {
    return this.http.get<TerraceModel[]>(this.API).
    pipe(map((data: TerraceModel[]) => data ),
      catchError(error => {
        this.handleError(error);
        return of( this.fallbackTerraceModel );
      })
    );
  }

  getById(id: number): Observable<TerraceModel> {

    const fallback = this.fallbackTerraceModel.find(t => t.id === id)
                    || this.fallbackTerraceModel[0];

        return of(fallback);

    return this.http.get<TerraceModel>(`${this.API}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching terrace type with ID ${id}:`, error);

        const fallback = this.fallbackTerraceModel.find(t => t.id === id)
                    || this.fallbackTerraceModel[0];

        return of(fallback);
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

  private handleError(error: any): Observable<never>{
    return throwError(() => new Error('Something ocurried in eventTypeService.', error));
  }

}
