import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { TerraceModel as T_TerraceModel } from '../../models/ms_template/terrace';
import { TerraceModel as R_TerraceModel } from '../../models/ms_reserve/TerraceModel';

export interface TerracePairModel {
  templateTerrace: T_TerraceModel;
  reserveTerrace: R_TerraceModel;
}

@Injectable({ providedIn: 'root' })
export class TerracePairStore {
  // Subject principal para el par de terrazas
  private terracePairSubject = new BehaviorSubject<TerracePairModel | null>(null);
  
  // Observable público para suscribirse
  terracePair$ = this.terracePairSubject.asObservable();

  // 🔽 MÉTODOS PARA GUARDAR DATOS

  // Guardar el par completo
  setTerracePair(pair: TerracePairModel): void {
    this.terracePairSubject.next(pair);
  }

  // Guardar individualmente (pero asegurando que ambos existan)
  setTemplateTerrace(templateTerrace: T_TerraceModel): void {
    const current = this.terracePairSubject.value;
    const newPair: TerracePairModel = {
      templateTerrace: templateTerrace,
      reserveTerrace: current?.reserveTerrace || this.createEmptyReserveTerrace()
    };
    this.terracePairSubject.next(newPair);
  }

  setReserveTerrace(reserveTerrace: R_TerraceModel): void {
    const current = this.terracePairSubject.value;
    const newPair: TerracePairModel = {
      templateTerrace: current?.templateTerrace || this.createEmptyTemplateTerrace(),
      reserveTerrace: reserveTerrace
    };
    this.terracePairSubject.next(newPair);
  }

  // 🔼 MÉTODOS PARA OBTENER DATOS

  // Obtener el par completo (sincrónico)
  getTerracePair(): TerracePairModel | null {
    return this.terracePairSubject.value;
  }

  // Obtener solo la terraza de template (sincrónico)
  getTemplateTerrace(): T_TerraceModel | null {
    return this.terracePairSubject.value?.templateTerrace || null;
  }

  // Obtener solo la terraza de reserve (sincrónico)
  getReserveTerrace(): R_TerraceModel | null {
    return this.terracePairSubject.value?.reserveTerrace || null;
  }

  // 🗃️ MÉTODOS DE PERSISTENCIA

  // Guardar en localStorage
  saveToLocalStorage(): void {
    const pair = this.terracePairSubject.value;
    if (pair) {
      localStorage.setItem('terracePair', JSON.stringify(pair));
    }
  }

  // Cargar desde localStorage
  loadFromLocalStorage(): void {
    const stored = localStorage.getItem('terracePair');
    if (stored) {
      try {
        const pair: TerracePairModel = JSON.parse(stored);
        this.terracePairSubject.next(pair);
      } catch (error) {
        console.error('Error loading from localStorage:', error);
      }
    }
  }

  // 🧹 MÉTODOS DE UTILIDAD

  // Limpiar el almacén
  clear(): void {
    this.terracePairSubject.next(null);
    localStorage.removeItem('terracePair');
  }

  // Verificar si hay datos
  hasData(): boolean {
    return this.terracePairSubject.value !== null;
  }

  // 🔧 MÉTODOS PRIVADOS PARA CREAR OBJETOS VACÍOS

  private createEmptyTemplateTerrace(): T_TerraceModel {
    return {
      id: 0,
      name: '',
      terraceType: [],
      cityModel: { id: 0, kind: '' },
      idTerrace_DB: 0,
      idAsociate_DB: 0,
      URL_IMG: [],
      description: '',
      price: 0,
      place: ''
    };
  }

  private createEmptyReserveTerrace(): R_TerraceModel {
    return {
      id: 0,
      name: '',
      asociateTerraceModel: {
        id: 0,
        name: '',
        idUser: 0,
        mail: '',
        phone: ''
      },
      baseSize: 0,
      maxSize: 0,
      priceAdd10: 0,
      direction: '',
      killed: false
    };
  }
}