import { ServiceTypeModel } from '../models/ms_template/service-type';
import { ServiceModel } from '../models/ms_template/service-model';
import { CityModel } from "../models/ms_template/city-type"
import { EventTypeModel } from "../models/ms_template/event-type"
import { TerraceTypeModel } from "../models/ms_template/terrace-type"
import { TerraceModel } from '../models/ms_template/terrace';
import { TemplateModel } from '../models/ms_template/template';

// sEKJju$2MA19xRww
// msdatabaseterrace-admin

export const eventTypeTs: EventTypeModel[] = [
  { id: 1, kind: 'Boda'},
  { id: 2, kind: 'Cumpleaños'},
  { id: 3, kind: 'Conferencia'},
  { id: 4, kind: 'Graduación' },
  { id: 5, kind: 'Empresarial'},
  { id: 6, kind: 'XV\'s'},
  { id: 7, kind: 'Asado'},
  { id: 8, kind: 'Bautizo'},
]

export const cityModelTs: CityModel[] = [
  { id: 1, kind: 'Guadalajara'},
  { id: 2, kind: 'Zapopan'},
  { id: 3, kind: 'Tlaquepaque' },
  { id: 4, kind: 'Tonala'},
  { id: 5, kind: 'Zapotlanejo'},
  { id: 6, kind: 'Tlajomulco'},
]

export const serviceTypeTs: ServiceTypeModel[] = [
  { id: 1, kind: 'Meseros'},
  { id: 2, kind: 'Fotografos'},
  { id: 3, kind: 'Comida' },
  { id: 4, kind: 'Bartender'},
  { id: 5, kind: 'Musica'},
  { id: 6, kind: 'Entretenimiento'},
]

export const terraceTypeTs: TerraceTypeModel[] = [
  { id: 1, kind: 'Alberca'},
  { id: 2, kind: 'Tradicional'},
  { id: 3, kind: 'Salon' },
  { id: 4, kind: 'Exposicion'},
  { id: 5, kind: 'Natural'},
  { id: 6, kind: 'Experiencia'},
]

export const serviceModelTs: ServiceModel[] = [
  {
    id: 1,
    serviceType: [serviceTypeTs[0]], // Meseros
    cityModel: [cityModelTs[0]],     // Guadalajara
    idService_DB: 101,
    idAsociate_DB: 201,
    URL_IMG: ['https://example.com/images/meseros.jpg'],
    name: 'Servicio de Meseros Elegantes',
    description: 'Meseros capacitados para eventos de alto nivel.',
    price: 3500,
  },
  {
    id: 2,
    serviceType: [serviceTypeTs[2]], // Comida
    cityModel: [cityModelTs[1]],     // Zapopan
    idService_DB: 102,
    idAsociate_DB: 202,
    URL_IMG: ['https://example.com/images/comida.jpg'],
    name: 'Banquete Tradicional Mexicano',
    description: 'Comida mexicana gourmet para todo tipo de eventos.',
    price: 8000,
  },
  {
    id: 3,
    serviceType: [serviceTypeTs[4]], // Música
    cityModel: [cityModelTs[2]],     // Tlaquepaque
    idService_DB: 103,
    idAsociate_DB: 203,
    URL_IMG: ['https://example.com/images/musica.jpg'],
    name: 'DJ Profesional',
    description: 'DJ con equipo profesional y playlist personalizada.',
    price: 5000,
  },
  {
    id: 4,
    serviceType: [serviceTypeTs[1]], // Fotógrafos
    cityModel: [cityModelTs[3]],     // Tonalá
    idService_DB: 104,
    idAsociate_DB: 204,
    URL_IMG: ['https://example.com/images/fotografia.jpg'],
    name: 'Cobertura Fotográfica Premium',
    description: 'Fotografía profesional con entrega en digital e impresión.',
    price: 6000,
  },
  {
    id: 5,
    serviceType: [serviceTypeTs[3]], // Bartender
    cityModel: [cityModelTs[4]],     // Zapotlanejo
    idService_DB: 105,
    idAsociate_DB: 205,
    URL_IMG: ['https://example.com/images/bartender.jpg'],
    name: 'Barra Libre con Bartender',
    description: 'Cocteles ilimitados con barra temática y mixólogo profesional.',
    price: 7000,
  },
  {
    id: 6,
    serviceType: [serviceTypeTs[5]], // Entretenimiento
    cityModel: [cityModelTs[5]],     // Tlajomulco
    idService_DB: 106,
    idAsociate_DB: 206,
    URL_IMG:[ 'https://example.com/images/entretenimiento.jpg'],
    name: 'Show de Stand-Up y Magia',
    description: 'Entretenimiento divertido para todas las edades.',
    price: 4500,
  }
];

export const terraceModelTs: TerraceModel[] = [
  {
    id: 1,
    terraceType: [terraceTypeTs[0]], // Alberca
    cityModel: cityModelTs[0],       // Guadalajara
    idTerrace_DB: 301,
    idAsociate_DB: 401,
    URL_IMG: ['../assets/testImg/terrace.jpeg'],
    name: 'Terraza con Alberca Azul',
    description: 'Espacio moderno con alberca, ideal para bodas y graduaciones.',
    price: 12000,
    place: 'Zona Real'
  },
  {
    id: 2,
    terraceType: [terraceTypeTs[1]], // Tradicional
    cityModel: cityModelTs[1],       // Zapopan
    idTerrace_DB: 302,
    idAsociate_DB: 402,
    URL_IMG: ['https://example.com/images/terraza-tradicional.jpg'],
    name: 'Terraza El Encino',
    description: 'Ambiente rústico y cálido, perfecto para eventos familiares.',
    price: 9000,
    place: 'Colonia Seattle'
  },
  {
    id: 3,
    terraceType: [terraceTypeTs[2]], // Salón
    cityModel: cityModelTs[2],       // Tlaquepaque
    idTerrace_DB: 303,
    idAsociate_DB: 403,
    URL_IMG: ['https://example.com/images/terraza-salon.jpg'],
    name: 'Salón Los Arcos',
    description: 'Salón cerrado con aire acondicionado y pista de baile.',
    price: 10000,
    place: 'Centro Histórico'
  },
  {
    id: 4,
    terraceType: [terraceTypeTs[3]], // Exposición
    cityModel: cityModelTs[3],       // Tonalá
    idTerrace_DB: 304,
    idAsociate_DB: 404,
    URL_IMG: ['https://example.com/images/terraza-expo.jpg'],
    name: 'Terraza ExpoTonala',
    description: 'Espacio amplio para exposiciones, ferias y conferencias.',
    price: 8500,
    place: 'Zona Artesanal'
  },
  {
    id: 5,
    terraceType: [terraceTypeTs[4]], // Natural
    cityModel: cityModelTs[4],       // Zapotlanejo
    idTerrace_DB: 305,
    idAsociate_DB: 405,
    URL_IMG: ['https://example.com/images/terraza-natural.jpg'],
    name: 'Jardín Natural El Roble',
    description: 'Ubicación rodeada de naturaleza, ideal para eventos al aire libre.',
    price: 9500,
    place: 'Paraje El Roble'
  },
  {
    id: 6,
    terraceType: [terraceTypeTs[5]], // Experiencia
    cityModel: cityModelTs[5],       // Tlajomulco
    idTerrace_DB: 306,
    idAsociate_DB: 406,
    URL_IMG: ['https://example.com/images/terraza-experiencia.jpg'],
    name: 'Terraza Experiencia 360',
    description: 'Terraza inmersiva con experiencias interactivas y decoración temática.',
    price: 15000,
    place: 'Bosques de Santa Anita'
  }
];

export const templateModelTs: TemplateModel[] = [
  {
    id: 1,
    eventType: eventTypeTs[0], // Boda
    terraceTypeModel: terraceTypeTs[0], // Alberca
    cityModel: cityModelTs[0], // Guadalajara
    serviceTypeModel: [serviceTypeTs[0],serviceTypeTs[1], serviceTypeTs[2]], // Meseros en GDL
    name: 'Boda en Terraza con Alberca',
    description: 'Paquete ideal para bodas con terraza con alberca en Guadalajara, incluye meseros.'
  },
  {
    id: 2,
    eventType: eventTypeTs[1], // Cumpleaños
    terraceTypeModel: terraceTypeTs[1], // Tradicional
    cityModel: cityModelTs[1], // Zapopan
    serviceTypeModel: [serviceTypeTs[1], serviceTypeTs[2]], // Fotógrafos + Comida
    name: 'Cumpleaños Familiar Tradicional',
    description: 'Paquete para cumpleaños en terraza tradicional con comida y fotógrafo.'
  },
  {
    id: 3,
    eventType: eventTypeTs[3], // Graduación
    terraceTypeModel: terraceTypeTs[2], // Salón
    cityModel: cityModelTs[2], // Tlaquepaque
    serviceTypeModel: [serviceTypeTs[0],serviceTypeTs[1], serviceTypeTs[2],serviceTypeTs[3]], // Bartender
    name: 'Graduación en Salón',
    description: 'Incluye salón equipado con pista de baile y servicio de bar profesional.'
  },
  {
    id: 4,
    eventType: eventTypeTs[5], // XV's
    terraceTypeModel: terraceTypeTs[4], // Natural
    cityModel: cityModelTs[4], // Zapotlanejo
    serviceTypeModel: [serviceTypeTs[4], serviceTypeTs[2]], // Música + Comida
    name: 'XV Años al Aire Libre',
    description: 'Celebración de XV\'s en jardín natural con música en vivo y catering.'
  },
  {
    id: 5,
    eventType: eventTypeTs[2], // Conferencia
    terraceTypeModel: terraceTypeTs[3], // Exposición
    cityModel: cityModelTs[3], // Tonalá
    serviceTypeModel: [serviceTypeTs[0], serviceTypeTs[1], serviceTypeTs[2]], // Fotógrafos
    name: 'Conferencia Profesional',
    description: 'Salón tipo exposición con cobertura fotográfica para eventos corporativos.'
  }
];
