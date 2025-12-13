import { ServiceModel } from './../../models/ms_template/service-model';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, map, throwError, of, tap} from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';

import { serviceModelTs, serviceTypeTs } from '../../assets/template-test-data'
import { ResponsePage } from '../../models/ResponsePage';

@Injectable({
  providedIn: 'root',
})
export class ServiceService{

  private API = environment.msTemplatesUrl + '/service';

  constructor(private http: HttpClient){

  }

  private fallbackServices: ServiceModel[] = [];

  getAll(): Observable<ServiceModel[]> {
    return this.http.get<ResponsePage<ServiceModel[]>>(this.API).pipe(
      map( response => {
        this.fallbackServices = response.content;
        return response.content;
      }),
      catchError(error => {
        this.handleError(error);
        return this.loadLocalServicesWithFallback();
      })
    );
  }

  getByServiceType(serviceTypeId: number): Observable<ServiceModel[]> {
    return this.http.get<ResponsePage<ServiceModel[]>>(`${this.API}/ServiceType/${serviceTypeId}`).pipe(
      map( response => {
        return response.content;
      }),
      catchError(error => {
        this.handleError(error);
        return this.loadLocalServicesWithFallback().pipe(
          map(services => services.filter
            (s => s.serviceType && (Array.isArray(s.serviceType) ? 
            s.serviceType.some(t => t.id === serviceTypeId) : 
            (s.serviceType as any).id === serviceTypeId)))
        );
      })
    );
  }

  getById(id: number): Observable<ServiceModel> {
      return this.http.get<ServiceModel>(`${this.API}/${id}`).pipe(
        catchError(error => {
          console.error(`Error fetching Service with ID ${id}:`, error);
          const fallback = this.fallbackServices.find(s => s.id === id) || this.fallbackServices[0];
          return of(fallback);
        })
      );
    }

private loadLocalServicesWithFallback(): Observable<ServiceModel[]> {
    return this.loadLocalServices().pipe(
      tap(data => {
        this.fallbackServices = data;
        console.warn('✅ Services locales cargados como fallback');
      }),
      catchError(localError => {
        console.error('❌ Error cargando services locales:', localError);
        console.warn('📋 Usando fallback existente:', this.fallbackServices);
        return of(this.fallbackServices);
      })
    );
  }

  loadLocalServices(): Observable<ServiceModel[]> {
    return this.http.get<ServiceModel[]>('assets/template/service.json');
  }

  private handleError(error: any): Observable<never>{
    return throwError(() => new Error('Something ocurried in eventTypeService.', error));
  }

}
