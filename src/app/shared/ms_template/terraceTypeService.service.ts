import { TerraceTypeModel } from './../../models/ms_template/terrace-type';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, map, throwError, of, tap} from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';

import { terraceTypeTs } from '../../assets/template-test-data'
import { ResponsePage } from '../../models/ResponsePage';

@Injectable({
  providedIn: 'root',
})
export class TerraceTypeService{

  private API = environment.msTemplatesUrl + '/terrace-types';

  constructor(private http: HttpClient){

  }

  private terraceTypeModel : TerraceTypeModel[] = [];

  loadLocalTerraceTypes(): Observable<TerraceTypeModel[]> {
    return this.http.get<TerraceTypeModel[]>('assets/template/terracesType.json'); // Ajusta la ruta
  }

  getAll(): Observable<TerraceTypeModel[]>
  {
    return this.http.get<TerraceTypeModel[]>(this.API).pipe(
      map(response => {
        this.terraceTypeModel = response;
        return response;
      }),
      catchError(error => {
        this.handleError(error);
        return this.loadLocalTerraceTypes().pipe(
          tap(data => {
            this.terraceTypeModel = data; 
            console.warn('Terrace types locales cargados:', this.terraceTypeModel);
          }),
          catchError(localError => {
            console.error('Error cargando terrace types locales:', localError);
            return of(this.terraceTypeModel.length > 0 ? this.terraceTypeModel : []);
          })
        );
      })
    );
  }

  getById(id: number): Observable<TerraceTypeModel> {
    return this.http.get<TerraceTypeModel>(`${this.API}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching terrace type with ID ${id}:`, error);
        return throwError(() => new Error(`Failed to fetch terrace type with ID ${id}`));
      })
    );
  }

  create(terraceType: TerraceTypeModel): Observable<TerraceTypeModel> {
    return this.http.post<TerraceTypeModel>(this.API, terraceType).pipe(
      catchError(error => {
        console.error('Error creating terrace type:', error);
        return throwError(() => new Error('Failed to create terrace type'));
      })
    );
  }

  private handleError(error: any): Observable<never>{
    return throwError(() => new Error('Something ocurried in eventTypeService.', error));
  }

}
