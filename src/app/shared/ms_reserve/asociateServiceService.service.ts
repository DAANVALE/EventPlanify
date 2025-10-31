import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, map, throwError, of } from 'rxjs';
import { AsociateServiceModel } from '../../models/ms_reserve/AsociateServiceModel';
import { asociateServiceModelTs } from '../../assets/reserve-test-data'; // opcional para fallback
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AsociateServiceServiceService {

  private API = environment.msReservesUrl + '/asociate-service';
  asociateServices: AsociateServiceModel[] = [];

  // Datos de prueba si el backend falla
  fallbackAsociateServiceModel = asociateServiceModelTs;

  constructor(private http: HttpClient) {}

  /** 🔹 Obtener todos los asociados activos (con paginación) */
  getAllActive(page = 0, size = 10): Observable<AsociateServiceModel[]> {
    return this.http
      .get<any>(`${this.API}?page=${page}&size=${size}`)
      .pipe(
        map(response => response.content || []),
        catchError(error => {
          console.error('Error fetching active asociates:', error);
          return of(this.fallbackAsociateServiceModel);
        })
      );
  }

  /** 🔹 Obtener todos los asociados (sin filtro de activos) */
  getAll(page = 0, size = 10): Observable<AsociateServiceModel[]> {
    return this.http
      .get<any>(`${this.API}/all?page=${page}&size=${size}`)
      .pipe(
        map(response => response.content || []),
        catchError(error => {
          console.error('Error fetching asociates:', error);
          return of(this.fallbackAsociateServiceModel);
        })
      );
  }

  /** 🔹 Buscar por ID */
  getById(id: number): Observable<AsociateServiceModel> {
    return this.http.get<AsociateServiceModel>(`${this.API}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching asociate with ID ${id}:`, error);
        const fallback = this.fallbackAsociateServiceModel.find(t => t.id === id)
                        || this.fallbackAsociateServiceModel[0];
        return of(fallback);
      })
    );
  }

  /** 🔹 Crear o guardar un asociado */
  create(model: AsociateServiceModel): Observable<AsociateServiceModel> {
    return this.http.post<AsociateServiceModel>(this.API, model).pipe(
      catchError(error => {
        console.error('Error creating AsociateService:', error);
        return throwError(() => new Error('Failed to create AsociateService'));
      })
    );
  }

  /** 🔹 Eliminar por modelo (usa POST /delete) */
  delete(model: AsociateServiceModel): Observable<AsociateServiceModel> {
    return this.http.post<AsociateServiceModel>(`${this.API}/delete`, model).pipe(
      catchError(error => {
        console.error('Error deleting AsociateService:', error);
        return throwError(() => new Error('Failed to delete AsociateService'));
      })
    );
  }

  /** 🔹 Eliminar por ID (usa POST /delete/{id}) */
  deleteById(id: number): Observable<AsociateServiceModel> {
    return this.http.post<AsociateServiceModel>(`${this.API}/delete/${id}`, {}).pipe(
      catchError(error => {
        console.error(`Error deleting AsociateService with ID ${id}:`, error);
        return throwError(() => new Error('Failed to delete AsociateService'));
      })
    );
  }

  /** 🔹 Manejo de errores general */
  private handleError(error: any): Observable<never> {
    console.error('Something went wrong in AsociateServiceService:', error);
    return throwError(() => new Error('Service error'));
  }
}
