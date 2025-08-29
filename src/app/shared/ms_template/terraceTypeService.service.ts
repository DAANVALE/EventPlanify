import { TerraceTypeModel } from './../../models/ms_template/terrace-type';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, map, throwError, of} from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';

import { terraceTypeTs } from '../../assets/template-test-data'

@Injectable({
  providedIn: 'root',
})
export class TerraceTypeService{

  private API = environment.msTemplatesUrl + '/terrace-types';

  constructor(private http: HttpClient){

  }

  private terraceTypeModel = terraceTypeTs;

  getAll(): Observable<TerraceTypeModel[]>
  {
    return this.http.get<TerraceTypeModel[]>(this.API).
    pipe(map((data: TerraceTypeModel[]) => data ),
      catchError(error => {
        this.handleError(error);
        return of(this.terraceTypeModel);
      })
    );
  }

  getById(id: number): Observable<TerraceTypeModel> {
    return this.http.get<TerraceTypeModel>(`${this.API}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching terrace type with ID ${id}:`, error);
        return throwError(() => new Error(`Failed to fetch terrace type with ID ${id}`));
      })
    );
  }

  create(terraceType: TerraceTypeModel): Observable<TerraceTypeModel> {
    return this.http.post<TerraceTypeModel>(this.API, terraceType).pipe(
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
