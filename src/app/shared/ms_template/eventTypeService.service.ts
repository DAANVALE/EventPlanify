import { HttpClient } from '@angular/common/http';
import { catchError, Observable, map, throwError, of} from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment.local';

import { EventTypeModel } from './../../models/ms_template/event-type';

@Injectable({
  providedIn: 'root',
})
export class EventTypeService{

  private Api = environment.msTemplatesUrl + '/event-types';

  constructor(private http: HttpClient){

  }

  private eventTypeModel: EventTypeModel[] = [
    { id: 1, kind: 'Boda'},
    { id: 2, kind: 'Cumpleaños'},
    { id: 3, kind: 'Conferencia'},
    { id: 4, kind: 'Graduación', },
    { id: 5, kind: 'Empresarial'},
    { id: 6, kind: 'XV\'s'},
    { id: 7, kind: 'Asado'},
    { id: 8, kind: 'Bautizo'}
  ]

  getAll(): Observable<EventTypeModel[]>
  {
    return this.http.get<EventTypeModel[]>(this.Api).
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
