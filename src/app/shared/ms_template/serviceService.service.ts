import { ServiceModel } from './../../models/ms_template/service-model';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, map, throwError, of} from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';

import { serviceModelTs, serviceTypeTs } from '../../assets/test-data'

@Injectable({
  providedIn: 'root',
})
export class ServiceService{

  private API = environment.msTemplatesUrl + '/service';

  constructor(private http: HttpClient){

  }

  private ServiceModel = serviceModelTs;

  getAll(): Observable<ServiceModel[]>
  {
    return this.http.get<ServiceModel[]>(this.API).
    pipe(map((data: ServiceModel[]) => data ),
      catchError(error => {
        this.handleError(error);
        return of(this.ServiceModel);
      })
    );
  }

  private handleError(error: any): Observable<never>{
    return throwError(() => new Error('Something ocurried in eventTypeService.', error));
  }

}
