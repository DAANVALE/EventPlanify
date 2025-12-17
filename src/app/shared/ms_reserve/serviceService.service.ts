import { ServiceModel } from './../../models/ms_reserve/ServiceModel';

import { HttpClient } from '@angular/common/http';
import { catchError, Observable, map, throwError, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';

import { ServiceModelTs } from '../../assets/reserve-test-data';

@Injectable({
  providedIn: 'root',
})
export class ServiceService{

  private API = environment.msReservesUrl + '/Service';
  ServiceModel: ServiceModel[] = [];

  fallbackServiceModel: ServiceModel[] = [];

  constructor(private http: HttpClient){

  }

  getAll(): Observable<ServiceModel[]>
  {
    return this.http.get<ServiceModel[]>(this.API).
    pipe(
      map( data => {
        this.fallbackServiceModel = data;
        return data;
      }),
      catchError(error => {
        this.handleError(error);
        return this.loadLocalTerracesWithFallback();
      })
    );
  }

  getById(id: number): Observable<ServiceModel> {

    debugger;
    const fallback = this.fallbackServiceModel.find(t => t.id === id);

    if (fallback != null) {
        return of(fallback);
    }

    return this.http.get<ServiceModel>(`${this.API}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching Service type with ID ${id}:`, error);

        this.loadLocalTerracesWithFallback().pipe().subscribe();

        const fallback = this.fallbackServiceModel.find(t => t.id === id)
                    || this.fallbackServiceModel[0];

        return of(fallback);
      })
    );
  }

  create(ServiceType: ServiceModel): Observable<ServiceModel> {
    return this.http.post<ServiceModel>(this.API, ServiceType).pipe(
      catchError(error => {
        console.error('Error creating Service type:', error);
        return throwError(() => new Error('Failed to create Service type'));
      })
    );
  }

  loadLocalServices(): Observable<ServiceModel[]> {
      return this.http.get<ServiceModel[]>('assets/reserve/service.json');
    }
  
  private loadLocalTerracesWithFallback(): Observable<ServiceModel[]> {
    return this.loadLocalServices().pipe(
      tap(data => {
        this.fallbackServiceModel = data;
        console.warn('✅ Terraces locales cargados como fallback');
      }),
      catchError(localError => {
        this.handleError(localError);
        console.error('❌ Error cargando terraces locales:', localError);
        return of(this.fallbackServiceModel);
      })
    );
  }

  private handleError(error: any): Observable<never>{
    return throwError(() => new Error('Something ocurried in eventTypeService.', error));
  }

}
