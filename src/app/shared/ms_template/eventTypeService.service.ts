import { HttpClient } from '@angular/common/http';
import { catchError, Observable, map, throwError, of} from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';

import { EventTypeModel } from './../../models/ms_template/event-type';

import { eventTypeTs } from '../../assets/test-data'

@Injectable({
  providedIn: 'root',
})
export class EventTypeService{

  private API = environment.msTemplatesUrl + '/event-types';

  constructor(private http: HttpClient){

  }

  private eventTypeModel = eventTypeTs;

  getAll(): Observable<EventTypeModel[]>
  {
    return this.http.get<EventTypeModel[]>(this.API).
    pipe(map((data: EventTypeModel[]) => data ),
      catchError(error => {
        this.handleError(error);
        return of(this.eventTypeModel);
      })
    );
  }

  private handleError(error: any): Observable<never>{
    return throwError(() => new Error('Something ocurried in eventTypeService.', error));
  }

}
