
import { AsociateTerraceModel } from '../models/ms_reserve/AsociateTerraceModel';
import { TerraceModel } from '../models/ms_reserve/TerraceModel';

import { AsociateServiceModel } from '../models/ms_reserve/AsociateServiceModel';
import { ServiceModel } from '../models/ms_reserve/ServiceModel';

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

export const asociateServiceModelTs: AsociateServiceModel[] = [
  {
    id: 201,
    idUser: 101,
    name: 'Meseros Profesionales GDL',
    mail: 'meserosgdl@example.com',
    phone: '33-1111-2222',
    killed: false
  },
  {
    id: 202,
    idUser: 102,
    name: 'Banquetes Mexicanos Zapopan',
    mail: 'banqueteszapopan@example.com',
    phone: '33-2222-3333',
    killed: false
  },
  {
    id: 203,
    idUser: 103,
    name: 'DJ Profesional Tlaquepaque',
    mail: 'djtlaquepaque@example.com',
    phone: '33-3333-4444',
    killed: false
  },
  {
    id: 204,
    idUser: 104,
    name: 'Fotografía Premium Tonalá',
    mail: 'fototonala@example.com',
    phone: '33-4444-5555',
    killed: false
  },
  {
    id: 205,
    idUser: 105,
    name: 'Mixología Zapotlanejo',
    mail: 'mixologiazap@example.com',
    phone: '33-5555-6666',
    killed: false
  },
  {
    id: 206,
    idUser: 106,
    name: 'Entretenimiento Tlajomulco',
    mail: 'showtlajomulco@example.com',
    phone: '33-6666-7777',
    killed: false
  },
  {
    id: 207,
    idUser: 107,
    name: 'Decoraciones Elegantes GDL',
    mail: 'decoragdl@example.com',
    phone: '33-7777-8888',
    killed: false
  },
  {
    id: 208,
    idUser: 108,
    name: 'Transporte Ejecutivo Zapopan',
    mail: 'transportezapopan@example.com',
    phone: '33-8888-9999',
    killed: false
  },
  {
    id: 209,
    idUser: 109,
    name: 'Seguridad Privada Tlaquepaque',
    mail: 'seguridadtlaque@example.com',
    phone: '33-9999-0000',
    killed: false
  },
  {
    id: 210,
    idUser: 110,
    name: 'Coordinación de Eventos Tonalá',
    mail: 'coordinaciontonala@example.com',
    phone: '33-0000-1111',
    killed: false
  },
  {
    id: 211,
    idUser: 111,
    name: 'Logística Integral Zapotlanejo',
    mail: 'logisticazap@example.com',
    phone: '33-1122-3344',
    killed: false
  },
  {
    id: 212,
    idUser: 112,
    name: 'Streaming Profesional Tlajomulco',
    mail: 'streamingtlajo@example.com',
    phone: '33-2233-4455',
    killed: false
  }
];

export const ServiceModelTs: ServiceModel[] = [
  {
    id: 101,
    name: 'Servicio de Meseros Elegantes',
    asociateServiceModel: asociateServiceModelTs[0],
    baseSize: 10,
    maxSize: 20,
    priceAdd10: 500,
    killed: false,
    basePrice: 3500
  },
  {
    id: 102,
    name: 'Banquete Tradicional Mexicano',
    asociateServiceModel: asociateServiceModelTs[1],
    baseSize: 25,
    maxSize: 50,
    priceAdd10: 800,
    killed: false,
    basePrice: 8000
  },
  {
    id: 103,
    name: 'DJ Profesional con Equipo Premium',
    asociateServiceModel: asociateServiceModelTs[2],
    baseSize: 5,
    maxSize: 10,
    priceAdd10: 300,
    killed: false,
    basePrice: 5000
  },
  {
    id: 104,
    name: 'Cobertura Fotográfica Premium',
    asociateServiceModel: asociateServiceModelTs[3],
    baseSize: 3,
    maxSize: 6,
    priceAdd10: 400,
    killed: false,
    basePrice: 6000
  },
  {
    id: 105,
    name: 'Barra Libre Premium con Mixólogo',
    asociateServiceModel: asociateServiceModelTs[4],
    baseSize: 8,
    maxSize: 16,
    priceAdd10: 600,
    killed: false,
    basePrice: 7000
  },
  {
    id: 106,
    name: 'Show de Stand-Up y Magia Interactiva',
    asociateServiceModel: asociateServiceModelTs[5],
    baseSize: 2,
    maxSize: 4,
    priceAdd10: 350,
    killed: false,
    basePrice: 4500
  },
  {
    id: 107,
    name: 'Decoración Temática Personalizada',
    asociateServiceModel: asociateServiceModelTs[6],
    baseSize: 6,
    maxSize: 12,
    priceAdd10: 450,
    killed: false,
    basePrice: 5500
  },
  {
    id: 108,
    name: 'Transporte Ejecutivo para Invitados',
    asociateServiceModel: asociateServiceModelTs[7],
    baseSize: 12,
    maxSize: 24,
    priceAdd10: 400,
    killed: false,
    basePrice: 4800
  },
  {
    id: 109,
    name: 'Servicio de Seguridad Privada',
    asociateServiceModel: asociateServiceModelTs[8],
    baseSize: 4,
    maxSize: 8,
    priceAdd10: 350,
    killed: false,
    basePrice: 5200
  },
  {
    id: 110,
    name: 'Coordinación Integral de Bodas',
    asociateServiceModel: asociateServiceModelTs[9],
    baseSize: 2,
    maxSize: 4,
    priceAdd10: 700,
    killed: false,
    basePrice: 8500
  },
  {
    id: 111,
    name: 'Logística Completa de Eventos',
    asociateServiceModel: asociateServiceModelTs[10],
    baseSize: 3,
    maxSize: 6,
    priceAdd10: 650,
    killed: false,
    basePrice: 7500
  },
  {
    id: 112,
    name: 'Transmisión en Vivo y Streaming',
    asociateServiceModel: asociateServiceModelTs[11],
    baseSize: 4,
    maxSize: 8,
    priceAdd10: 550,
    killed: false,
    basePrice: 6500
  },
  {
    id: 113,
    name: 'Paquete Completo Banquete + Barra',
    asociateServiceModel: asociateServiceModelTs[1], // Usa el de banquete
    baseSize: 30,
    maxSize: 60,
    priceAdd10: 1200,
    killed: false,
    basePrice: 12000
  },
  {
    id: 114,
    name: 'Combo Música y Espectáculo',
    asociateServiceModel: asociateServiceModelTs[2], // Usa el de DJ
    baseSize: 6,
    maxSize: 12,
    priceAdd10: 600,
    killed: false,
    basePrice: 8500
  },
  {
    id: 115,
    name: 'Fotografía con Escenarios Decorados',
    asociateServiceModel: asociateServiceModelTs[3], // Usa el de fotografía
    baseSize: 4,
    maxSize: 8,
    priceAdd10: 550,
    killed: false,
    basePrice: 9500
  },
  {
    id: 116,
    name: 'Transporte con Seguridad Incluida',
    asociateServiceModel: asociateServiceModelTs[7], // Usa el de transporte
    baseSize: 15,
    maxSize: 30,
    priceAdd10: 600,
    killed: false,
    basePrice: 7800
  },
  {
    id: 117,
    name: 'Coordinación con Soporte Logístico',
    asociateServiceModel: asociateServiceModelTs[9], // Usa el de coordinación
    baseSize: 3,
    maxSize: 6,
    priceAdd10: 900,
    killed: false,
    basePrice: 13500
  },
  {
    id: 118,
    name: 'Servicio de Meseros con Barra',
    asociateServiceModel: asociateServiceModelTs[0], // Usa el de meseros
    baseSize: 12,
    maxSize: 24,
    priceAdd10: 700,
    killed: false,
    basePrice: 9000
  },
  {
    id: 119,
    name: 'DJ con Transmisión en Vivo',
    asociateServiceModel: asociateServiceModelTs[2], // Usa el de DJ
    baseSize: 6,
    maxSize: 12,
    priceAdd10: 650,
    killed: false,
    basePrice: 9500
  },
  {
    id: 120,
    name: 'Paquete Premium Fotos + Música + Show',
    asociateServiceModel: asociateServiceModelTs[3], // Usa el de fotografía
    baseSize: 8,
    maxSize: 16,
    priceAdd10: 1100,
    killed: false,
    basePrice: 16500
  },
  {
    id: 121,
    name: 'Decoración con Transporte Temático',
    asociateServiceModel: asociateServiceModelTs[6], // Usa el de decoración
    baseSize: 10,
    maxSize: 20,
    priceAdd10: 650,
    killed: false,
    basePrice: 10300
  },
  {
    id: 122,
    name: 'Seguridad con Coordinación de Accesos',
    asociateServiceModel: asociateServiceModelTs[8], // Usa el de seguridad
    baseSize: 5,
    maxSize: 10,
    priceAdd10: 600,
    killed: false,
    basePrice: 9800
  },
  {
    id: 123,
    name: 'Logística con Soporte Digital',
    asociateServiceModel: asociateServiceModelTs[10], // Usa el de logística
    baseSize: 4,
    maxSize: 8,
    priceAdd10: 750,
    killed: false,
    basePrice: 11200
  },
  {
    id: 124,
    name: 'Servicio Integral de Alimentos y Bebidas',
    asociateServiceModel: asociateServiceModelTs[1], // Usa el de banquete
    baseSize: 35,
    maxSize: 70,
    priceAdd10: 1400,
    killed: false,
    basePrice: 18500
  },
  {
    id: 125,
    name: 'Creación de Ambiente Completo',
    asociateServiceModel: asociateServiceModelTs[2], // Usa el de DJ
    baseSize: 12,
    maxSize: 24,
    priceAdd10: 950,
    killed: false,
    basePrice: 15700
  },
  {
    id: 126,
    name: 'Evento Seguro con Memoria Fotográfica',
    asociateServiceModel: asociateServiceModelTs[3], // Usa el de fotografía
    baseSize: 6,
    maxSize: 12,
    priceAdd10: 850,
    killed: false,
    basePrice: 14300
  },
  {
    id: 127,
    name: 'Fiesta Completa con Logística',
    asociateServiceModel: asociateServiceModelTs[4], // Usa el de bartender
    baseSize: 10,
    maxSize: 20,
    priceAdd10: 1000,
    killed: false,
    basePrice: 16800
  },
  {
    id: 128,
    name: 'Experiencia Gastronómica con Música Digital',
    asociateServiceModel: asociateServiceModelTs[1], // Usa el de banquete
    baseSize: 28,
    maxSize: 56,
    priceAdd10: 1100,
    killed: false,
    basePrice: 15200
  },
  {
    id: 129,
    name: 'Espacio Decorado y Seguro',
    asociateServiceModel: asociateServiceModelTs[6], // Usa el de decoración
    baseSize: 8,
    maxSize: 16,
    priceAdd10: 700,
    killed: false,
    basePrice: 12600
  },
  {
    id: 130,
    name: 'Paquete Oro - Servicio Completo',
    asociateServiceModel: asociateServiceModelTs[0], // Usa el de meseros
    baseSize: 20,
    maxSize: 40,
    priceAdd10: 1800,
    killed: false,
    basePrice: 25000
  }
];