import { TerraceTypeModel } from './../../models/ms_template/terraceType';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, map, throwError, of} from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';

import { terraceTypeTs } from '../../assets/test-data'

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

  private handleError(error: any): Observable<never>{
    return throwError(() => new Error('Something ocurried in eventTypeService.', error));
  }

}
