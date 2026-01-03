import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, map, throwError, of, tap } from 'rxjs';
import { AsociateTerrace } from '../../models/ms_reserve/AsociateTerraceModel';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AsociateTerraceService {

  private API = environment.msReservesUrl + '/asociate-terrace';
  AsociateTerraces: AsociateTerrace[] = [];

  // Datos de prueba si el backend falla
  fallbackAsociateTerrace: AsociateTerrace[] = [];

  constructor(private http: HttpClient) {}

  /** 🔹 Obtener todos los asociados activos (con paginación) */
  getAllActive(page = 0, size = 10): Observable<AsociateTerrace[]> {
    return this.http
      .get<any>(`${this.API}?page=${page}&size=${size}`)
      .pipe(
        map(response => response.content || []),
        catchError(() => {
          return this.loadLocalTerracesWithFallback().pipe(
            tap((data) =>
            { console.warn('✅ Cargando asociados locales como fallback')
              this.fallbackAsociateTerrace = data.filter(a => a.killed == 0);
            },
            catchError(localError => {
              this.handleError(localError);
              console.error('❌ Error cargando asociados locales:', localError);
              return of(this.fallbackAsociateTerrace);
            })
          ));
        })
      );
  }

  /** 🔹 Obtener todos los asociados (sin filtro de activos) */
  getAll(page = 0, size = 10): Observable<AsociateTerrace[]> {
    return this.http
      .get<any>(`${this.API}/all?page=${page}&size=${size}`)
      .pipe(
        map(response => response.content || []),
        catchError(error => {
          return this.loadLocalTerracesWithFallback().pipe(
            tap((data) =>
            { console.warn('✅ Cargando asociados locales como fallback')
              this.fallbackAsociateTerrace = data;
            },
            catchError(localError => {
              this.handleError(localError);
              console.error('❌ Error cargando asociados locales:', localError);
              return of(this.fallbackAsociateTerrace);
            })
          ));
        })
      );
  }

  /** 🔹 Buscar por ID */
  getById(id: number): Observable<AsociateTerrace> {
    return this.http.get<AsociateTerrace>(`${this.API}/${id}`).pipe(
      catchError(error => {
        this.loadLocalTerracesWithFallback();
        console.error(`Error fetching asociate with ID ${id}:`, error);
        const fallback = this.fallbackAsociateTerrace.find(t => t.id === id)
                        || this.fallbackAsociateTerrace[0];
        return of(fallback);
      })
    );
  }

  getByIdUser(idUser: number): Observable<AsociateTerrace> {
    return this.http.get<AsociateTerrace>(`${this.API}/user/${idUser}`).pipe(
      catchError(error => {
        this.loadLocalTerracesWithFallback();
        const fallback = this.fallbackAsociateTerrace.find(t => t.idUser === idUser) 
                        || this.fallbackAsociateTerrace[0];
        console.error(`Error fetching asociates for user ID ${idUser}:`, error);
        return of(fallback);
      })
    );
  }

  /** 🔹 Crear o guardar un asociado */
  create(model: AsociateTerrace): Observable<AsociateTerrace> {
    return this.http.post<AsociateTerrace>(this.API, model).pipe(
      catchError(error => {
        console.error('Error creating AsociateTerrace:', error);
        return throwError(() => new Error('Failed to create AsociateTerrace'));
      })
    );
  }

  /** 🔹 Eliminar por modelo (usa POST /delete) */
  delete(model: AsociateTerrace): Observable<AsociateTerrace> {
    return this.http.post<AsociateTerrace>(`${this.API}/delete`, model).pipe(
      catchError(error => {
        console.error('Error deleting AsociateTerrace:', error);
        return throwError(() => new Error('Failed to delete AsociateTerrace'));
      })
    );
  }

  /** 🔹 Eliminar por ID (usa POST /delete/{id}) */
  deleteById(id: number): Observable<AsociateTerrace> {
    return this.http.post<AsociateTerrace>(`${this.API}/delete/${id}`, {}).pipe(
      catchError(error => {
        console.error(`Error deleting AsociateTerrace with ID ${id}:`, error);
        return throwError(() => new Error('Failed to delete AsociateTerrace'));
      })
    );
  }

  /** 🔹 Manejo de errores general */
  private handleError(error: any): Observable<never> {
    console.error('Something went wrong in AsociateTerraceService:', error);
    return throwError(() => new Error('Service error'));
  }

  loadLocalTerraces(): Observable<AsociateTerrace[]> {
        return this.http.get<AsociateTerrace[]>('assets/reserve/asociateTerrace.json');
      }
    
    private loadLocalTerracesWithFallback(): Observable<AsociateTerrace[]> {
      return this.loadLocalTerraces().pipe(
        tap(data => {
          this.fallbackAsociateTerrace = data;
          console.warn('✅ Terraces locales cargados como fallback');
        }),
        catchError(localError => {
          this.handleError(localError);
          console.error('❌ Error cargando associates terraces locales:', localError);
          return of(this.fallbackAsociateTerrace);
        })
      );
    }
}
