import { TerraceModel } from './../../models/ms_reserve/TerraceModel';

import { HttpClient } from '@angular/common/http';
import { catchError, Observable, map, throwError, of} from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class TerraceService{

  private API = environment.msReservesUrl + '/terrace';

  constructor(private http: HttpClient){

  }

  terraceModel: TerraceModel[] = [];

  getAll(): Observable<TerraceModel[]>
  {
    return this.http.get<TerraceModel[]>(this.API).
    pipe(map((data: TerraceModel[]) => data ),
      catchError(error => {
        this.handleError(error);
        return of( this.terraceModel );
      })
    );
  }

  getById(id: number): Observable<TerraceModel> {
    return this.http.get<TerraceModel>(`${this.API}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching terrace type with ID ${id}:`, error);
        return throwError(() => new Error(`Failed to fetch terrace type with ID ${id}`));
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
