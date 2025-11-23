import { ServiceTypeModel } from './../../models/ms_template/service-type';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, map, throwError, of, tap} from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';

import { serviceTypeTs } from "../../assets/template-test-data";

@Injectable({
  providedIn: 'root',
})
export class ServiceTypeService{

  private API = environment.msTemplatesUrl + '/service-types';

  constructor(private http: HttpClient){

  }

  private serviceTypeModel: ServiceTypeModel[] = [];

  // Método para cargar los datos del JSON
  loadServiceTypes(): Observable<any[]> {
    return this.http.get<any[]>('assets/template/servicesType.json');
  }

  // Método que usas en tu componente
  getLocalRealData(): void {
    this.loadServiceTypes().subscribe({
      next: (data) => {
        this.serviceTypeModel = data;
      },
      error: (error) => {
        this.serviceTypeModel = [];
      }
    });
  }

  getAll(): Observable<ServiceTypeModel[]>
  {
    return this.http.get<ServiceTypeModel[]>(this.API).pipe(
      map((data: ServiceTypeModel[]) => {
        // Actualizar el modelo global cuando la API funciona
        this.serviceTypeModel = data;
        return data;
      }),
      catchError(error => {
        console.warn('Error cargando JSON serviceType nube:');
        this.handleError(error);
        // Retornar el Observable del JSON y actualizar el modelo global
        return this.loadServiceTypes().pipe(
          tap(data => {
            this.serviceTypeModel = data; // Actualizar aquí también
          }),
          catchError(localError => {
            console.error('Error cargando JSON local:', localError);
            return of(this.serviceTypeModel); // Retornar lo que haya en el modelo
          })
        );
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
