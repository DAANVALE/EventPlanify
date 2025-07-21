import { TerraceModel } from './../../models/ms_template/terrace';
import { ServiceModel } from './../../models/ms_template/service-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

import { CityModel } from './../../models/ms_template/city-type';
import { cityModelTs } from '../../assets/test-data';

@Injectable({
  providedIn: 'root',
})
export class ImageFinderService {

  private fallbackImageUrl = 'https://source.unsplash.com/600x400/?';

  constructor(private http: HttpClient) {}


  getTerraceImage(terraceUrl: String): Observable<String> {
    return this.http.get(terraceUrl.toString(), { responseType: 'blob' }).pipe(
      map(blob => {
        return URL.createObjectURL(blob); // crea URL para blob válido
      }),
      catchError(err => {
        console.warn('No se pudo obtener imagen. Usando una de respaldo.');
        return of(this.fallbackImageUrl + "terrace"); // Imagen por defecto random
      })
    );
  }

  getFirstOrDefaultTerraceImage(terrace: TerraceModel): Observable<String> {
    const imageUrl = terrace.URL_IMG.length > 0 ? terrace.URL_IMG[0] : null;
    if (imageUrl) {
      return this.getTerraceImage(imageUrl.toString());
    } else {
      console.warn('No se pudo obtener imagen. Usando una de respaldo.');
      const url = `${encodeURIComponent(terrace.name)},${terrace.place},terraza,event`;
      return of(this.fallbackImageUrl + url);
    }
  }

  getRandomTerraceImg(terrace: TerraceModel): Observable<String> {
    const imageUrl = terrace.URL_IMG.length > 0 ? terrace.URL_IMG[ (Number)(Math.random() * terrace.URL_IMG.length)] : null;
    if (imageUrl) {
      return this.getTerraceImage(imageUrl.toString());
    } else {
      console.warn('No se pudo obtener imagen. Usando una de respaldo.');
      const url = `${encodeURIComponent(terrace.name)},${terrace.place},terraza,event`;
      return of(this.fallbackImageUrl + url);
    }
  }

}
