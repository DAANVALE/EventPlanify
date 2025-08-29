import { ServiceTypeModel } from './../../models/ms_template/service-type';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, map, throwError, of} from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';

import { serviceTypeTs } from '../../assets/template-test-data'

@Injectable({
  providedIn: 'root',
})
export class ServiceTypeService{

  private API = environment.msTemplatesUrl + '/service-types';

  constructor(private http: HttpClient){

  }

  private serviceTypeModel = serviceTypeTs;

  getAll(): Observable<ServiceTypeModel[]>
  {
    return this.http.get<ServiceTypeModel[]>(this.API).
    pipe(map((data: ServiceTypeModel[]) => data ),
      catchError(error => {
        this.handleError(error);
        return of(this.serviceTypeModel);
      })
    );
  }

  getById(id: number): Observable<ServiceTypeModel> {
    return this.http.get<ServiceTypeModel>(`${this.API}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching service type with ID ${id}:`, error);
        return throwError(() => new Error(`Failed to fetch service type with ID ${id}`));
      })
    );
  }

  create(serviceType: ServiceTypeModel): Observable<ServiceTypeModel> {
    return this.http.post<ServiceTypeModel>(this.API, serviceType).pipe(
      catchError((error) => {
        console.error('Error creating service type:', error);
        return throwError(() => new Error('Failed to create service type'));
      })
    );
  }

  private handleError(error: any): Observable<never>{
    return throwError(() => new Error('Something ocurried in eventTypeService.', error));
  }

}
