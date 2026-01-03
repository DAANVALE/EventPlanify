import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, map, throwError, of, tap } from 'rxjs';
import { AsociateService } from '../../models/ms_reserve/AsociateServiceModel';
import { environment } from '../../enviroments/enviroment';
import { ResponsePage } from '../../models/ResponsePage';

@Injectable({
  providedIn: 'root',
})
export class AsociateServiceService {

  private API = environment.msReservesUrl + '/asociate-service';
  asociateServices: AsociateService[] = [];

  // Datos de prueba si el backend falla
  fallbackAsociateService: AsociateService[] = [];

  constructor(private http: HttpClient) {}

  /** 🔹 Obtener todos los asociados activos (con paginación) */
  getAllActive(page = 0, size = 10): Observable<AsociateService[]> {
    return this.http
      .get<any>(`${this.API}?page=${page}&size=${size}`)
      .pipe(
        map(response => response.content || []),
        catchError(() => {
          return this.loadLocalAsociatesWithFallback().pipe(
            tap((data) =>
            { console.warn('✅ Cargando asociados locales como fallback')
              this.fallbackAsociateService = data.filter(a => a.killed == 0);
            },
            catchError(localError => {
              this.handleError(localError);
              console.error('❌ Error cargando asociados locales:', localError);
              return of(this.fallbackAsociateService);
            })
          ));
        })
      );
  }

  /** 🔹 Obtener todos los asociados (sin filtro de activos) */
  getAll(page = 0, size = 10): Observable<AsociateService[]> {
    return this.http.get<ResponsePage<AsociateService[]>>(`${this.API}/all?page=${page}&size=${size}`)
      .pipe(
        map(response => {
          this.fallbackAsociateService = response.content || [];
          return response.content || [];
        }),
        catchError(error => {
          return this.loadLocalAsociatesWithFallback();
        })
      );
  }

  /** 🔹 Buscar por ID */
  getById(id: number): Observable<AsociateService> {
    return this.http.get<AsociateService>(`${this.API}/${id}`).pipe(
      catchError(error => {
        this.loadLocalAsociatesWithFallback();
        console.error(`Error fetching asociate with ID ${id}:`, error);
        const fallback = this.fallbackAsociateService.find(t => t.id === id)
                        || this.fallbackAsociateService[0];
        return of(fallback);
      })
    );
  }

  getByIdUser(idUser: number): Observable<AsociateService> {
    return this.http.get<AsociateService>(`${this.API}/user/${idUser}`).pipe(
      catchError(error => {
        console.error(`Error fetching asociates for user ID ${idUser}:`, error);
        this.loadLocalAsociatesWithFallback();
        const fallback = this.fallbackAsociateService.find(t => t.idUser === idUser)
                        || this.fallbackAsociateService[0];
        return of(fallback);
      })
    );
  }

  /** 🔹 Crear o guardar un asociado */
  create(model: AsociateService): Observable<AsociateService> {
    return this.http.post<AsociateService>(this.API, model).pipe(
      catchError(error => {
        console.error('Error creating AsociateService:', error);
        return throwError(() => new Error('Failed to create AsociateService'));
      })
    );
  }

  /** 🔹 Eliminar por modelo (usa POST /delete) */
  delete(model: AsociateService): Observable<AsociateService> {
    return this.http.post<AsociateService>(`${this.API}/delete`, model).pipe(
      catchError(error => {
        console.error('Error deleting AsociateService:', error);
        return throwError(() => new Error('Failed to delete AsociateService'));
      })
    );
  }

  /** 🔹 Eliminar por ID (usa POST /delete/{id}) */
  deleteById(id: number): Observable<AsociateService> {
    return this.http.post<AsociateService>(`${this.API}/delete/${id}`, {}).pipe(
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

  loadLocalServices(): Observable<AsociateService[]> {
    return this.http.get<AsociateService[]>('assets/reserve/asociateService.json');
  }
    
    private loadLocalAsociatesWithFallback(): Observable<AsociateService[]> {
      return this.loadLocalServices().pipe(
        tap(data => {
          this.fallbackAsociateService = data;
          console.warn('✅ Asociates serv. locales cargados como fallback');
          console.log(this.fallbackAsociateService);
        }),
        catchError(localError => {
          this.handleError(localError);
          console.error('❌ Error cargando asociates serv. locales:', localError);
          return of(this.fallbackAsociateService);
        })
      );
    }
}
