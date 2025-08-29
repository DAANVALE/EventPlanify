
import { identity } from 'rxjs';
import { TerraceModel } from '../models/ms_reserve/TerraceModel';
import { AsociateTerraceModel } from '../models/ms_reserve/AsociateTerraceModel';

// sEKJju$2MA19xRww
// msdatabaseterrace-admin


export const asociateTerraceModellTs: AsociateTerraceModel[] = [
  {
    id: 401,
    idUser: 101,
    name: 'Asociado Alberca Azul',
    mail: 'alberca.azul@eventos.com',
    phone: '3312345678',
    killed: false
  },
  {
    id: 402,
    idUser: 102,
    name: 'Asociado El Encino',
    mail: 'el.encino@eventos.com',
    phone: '3323456789',
    killed: false
  },
  {
    id: 403,
    idUser: 103,
    name: 'Asociado Los Arcos',
    mail: 'salon.arcos@eventos.com',
    phone: '3334567890',
    killed: false
  },
  {
    id: 404,
    idUser: 104,
    name: 'Asociado ExpoTonala',
    mail: 'expo.tonala@eventos.com',
    phone: '3345678901',
    killed: false
  },
  {
    id: 405,
    idUser: 105,
    name: 'Asociado El Roble',
    mail: 'natural.roble@eventos.com',
    phone: '3356789012',
    killed: false
  },
  {
    id: 406,
    idUser: 106,
    name: 'Asociado Experiencia 360',
    mail: 'experiencia360@eventos.com',
    phone: '3367890123',
    killed: false
  }
];

export const terraceModelTs: TerraceModel[] = [
  {
    id: 301,
    name: 'Terraza con Alberca Azul',
    asociateTerraceModel: asociateTerraceModellTs[0],
    baseSize: 80,
    maxSize: 150,
    priceAdd10: 1500,
    direction: 'Av. Acueducto 123, Zona Real, Zapopan',
    killed: false
  },
  {
    id: 302,
    name: 'Terraza El Encino',
    asociateTerraceModel: asociateTerraceModellTs[1],
    baseSize: 60,
    maxSize: 100,
    priceAdd10: 1200,
    direction: 'Calle Encino 456, Col. Seattle, Zapopan',
    killed: false
  },
  {
    id: 303,
    name: 'Salón Los Arcos',
    asociateTerraceModel: asociateTerraceModellTs[2],
    baseSize: 90,
    maxSize: 180,
    priceAdd10: 1800,
    direction: 'Av. Revolución 789, Centro, Tlaquepaque',
    killed: false
  },
  {
    id: 304,
    name: 'Terraza ExpoTonala',
    asociateTerraceModel: asociateTerraceModellTs[3],
    baseSize: 70,
    maxSize: 160,
    priceAdd10: 1300,
    direction: 'Zona Artesanal, Tonalá',
    killed: false
  },
  {
    id: 305,
    name: 'Jardín Natural El Roble',
    asociateTerraceModel: asociateTerraceModellTs[4],
    baseSize: 100,
    maxSize: 200,
    priceAdd10: 1600,
    direction: 'Paraje El Roble, Zapotlanejo',
    killed: false
  },
  {
    id: 306,
    name: 'Terraza Experiencia 360',
    asociateTerraceModel: asociateTerraceModellTs[5],
    baseSize: 120,
    maxSize: 250,
    priceAdd10: 2000,
    direction: 'Bosques de Santa Anita, Tlajomulco',
    killed: false
  }
];