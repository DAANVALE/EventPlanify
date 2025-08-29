import { HttpClient } from '@angular/common/http';
import { catchError, Observable, map, throwError, of} from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';

import { EventTypeModel } from './../../models/ms_template/event-type';

import { eventTypeTs } from '../../assets/template-test-data'

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

  getById(id: number): Observable<EventTypeModel> {
    return this.http.get<EventTypeModel>(`${this.API}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching event type with ID ${id}:`, error);
        return throwError(() => new Error(`Failed to fetch event type with ID ${id}`));
      })
    );
  }

  create(eventType: EventTypeModel): Observable<EventTypeModel> {
    return this.http.post<EventTypeModel>(this.API, eventType).pipe(
      catchError((error) => {
        console.error('Error creating event type:', error);
        return throwError(() => new Error('Failed to create event type'));
      })
    );
  }

  private handleError(error: any): Observable<never>{
    return throwError(() => new Error('Something ocurried in eventTypeService.', error));
  }

}
