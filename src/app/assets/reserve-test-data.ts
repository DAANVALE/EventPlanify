
import { AsociateTerrace } from '../models/ms_reserve/AsociateTerraceModel';
import { TerraceModel } from '../models/ms_reserve/TerraceModel';

import { AsociateService } from '../models/ms_reserve/AsociateServiceModel';
import { ServiceModel } from '../models/ms_reserve/ServiceModel';

// sEKJju$2MA19xRww
// msdatabaseterrace-admin

export const asociateTerracelTs: AsociateTerrace[] = [
  {
    id: 401,
    idUser: 101,
    name: 'Asociado Alberca Azul',
    mail: 'alberca.azul@eventos.com',
    phone: '3312345678',
    killed: 0
  },
  {
    id: 402,
    idUser: 102,
    name: 'Asociado El Encino',
    mail: 'el.encino@eventos.com',
    phone: '3323456789',
    killed: 0
  },
  {
    id: 403,
    idUser: 103,
    name: 'Asociado Los Arcos',
    mail: 'salon.arcos@eventos.com',
    phone: '3334567890',
    killed: 0
  },
  {
    id: 404,
    idUser: 104,
    name: 'Asociado ExpoTonala',
    mail: 'expo.tonala@eventos.com',
    phone: '3345678901',
    killed: 0
  },
  {
    id: 405,
    idUser: 105,
    name: 'Asociado El Roble',
    mail: 'natural.roble@eventos.com',
    phone: '3356789012',
    killed: 0
  },
  {
    id: 406,
    idUser: 106,
    name: 'Asociado Experiencia 360',
    mail: 'experiencia360@eventos.com',
    phone: '3367890123',
    killed: 0
  }
];

export const terraceModelTs: TerraceModel[] = [
  {
    id: 301,
    name: 'Terraza con Alberca Azul',
    asociateTerrace: asociateTerracelTs[0],
    baseSize: 80,
    maxSize: 150,
    priceAdd10: 1500,
    direction: 'Av. Acueducto 123, Zona Real, Zapopan',
    killed: 0,
    basePrice: 10000
  },
  {
    id: 302,
    name: 'Terraza El Encino',
    asociateTerrace: asociateTerracelTs[1],
    baseSize: 60,
    maxSize: 100,
    priceAdd10: 1200,
    direction: 'Calle Encino 456, Col. Seattle, Zapopan',
    killed: 0,
    basePrice: 8000
  },
  {
    id: 303,
    name: 'Salón Los Arcos',
    asociateTerrace: asociateTerracelTs[2],
    baseSize: 90,
    maxSize: 180,
    priceAdd10: 1800,
    direction: 'Av. Revolución 789, Centro, Tlaquepaque',
    killed: 0,
    basePrice: 12000
  },
  {
    id: 304,
    name: 'Terraza ExpoTonala',
    asociateTerrace: asociateTerracelTs[3],
    baseSize: 70,
    maxSize: 160,
    priceAdd10: 1300,
    direction: 'Zona Artesanal, Tonalá',
    killed: 0,
    basePrice: 9000
  },
  {
    id: 305,
    name: 'Jardín Natural El Roble',
    asociateTerrace: asociateTerracelTs[4],
    baseSize: 100,
    maxSize: 200,
    priceAdd10: 1600,
    direction: 'Paraje El Roble, Zapotlanejo',
    killed: 0,
    basePrice: 11000
  },
  {
    id: 306,
    name: 'Terraza Experiencia 360',
    asociateTerrace: asociateTerracelTs[5],
    baseSize: 120,
    maxSize: 250,
    priceAdd10: 2000,
    direction: 'Bosques de Santa Anita, Tlajomulco',
    killed: 0,
    basePrice: 13000
  },
];

export const asociateServiceTs: AsociateService[] = [
  {
    id: 201,
    idUser: 101,
    name: 'Meseros Profesionales GDL',
    mail: 'meserosgdl@example.com',
    phone: '33-1111-2222',
    killed: 0,
  },
  {
    id: 202,
    idUser: 102,
    name: 'Banquetes Mexicanos Zapopan',
    mail: 'banqueteszapopan@example.com',
    phone: '33-2222-3333',
    killed: 0
  },
  {
    id: 203,
    idUser: 103,
    name: 'DJ Profesional Tlaquepaque',
    mail: 'djtlaquepaque@example.com',
    phone: '33-3333-4444',
    killed: 0
  },
  {
    id: 204,
    idUser: 104,
    name: 'Fotografía Premium Tonalá',
    mail: 'fototonala@example.com',
    phone: '33-4444-5555',
    killed: 0
  },
  {
    id: 205,
    idUser: 105,
    name: 'Mixología Zapotlanejo',
    mail: 'mixologiazap@example.com',
    phone: '33-5555-6666',
    killed: 0
  },
  {
    id: 206,
    idUser: 106,
    name: 'Entretenimiento Tlajomulco',
    mail: 'showtlajomulco@example.com',
    phone: '33-6666-7777',
    killed: 0
  },
  {
    id: 207,
    idUser: 107,
    name: 'Decoraciones Elegantes GDL',
    mail: 'decoragdl@example.com',
    phone: '33-7777-8888',
    killed: 0
  },
  {
    id: 208,
    idUser: 108,
    name: 'Transporte Ejecutivo Zapopan',
    mail: 'transportezapopan@example.com',
    phone: '33-8888-9999',
    killed: 0
  },
  {
    id: 209,
    idUser: 109,
    name: 'Seguridad Privada Tlaquepaque',
    mail: 'seguridadtlaque@example.com',
    phone: '33-9999-0000',
    killed: 0
  },
  {
    id: 210,
    idUser: 110,
    name: 'Coordinación de Eventos Tonalá',
    mail: 'coordinaciontonala@example.com',
    phone: '33-0000-1111',
    killed: 0
  },
  {
    id: 211,
    idUser: 111,
    name: 'Logística Integral Zapotlanejo',
    mail: 'logisticazap@example.com',
    phone: '33-1122-3344',
    killed: 0
  },
  {
    id: 212,
    idUser: 112,
    name: 'Streaming Profesional Tlajomulco',
    mail: 'streamingtlajo@example.com',
    phone: '33-2233-4455',
    killed: 0
  }
];

export const ServiceModelTs: ServiceModel[] = [
  {
    id: 101,
    name: 'Servicio de Meseros Elegantes',
    asociateService: asociateServiceTs[0],
    baseSize: 10,
    maxSize: 20,
    priceAdd10: 500,
    killed: 0,
    basePrice: 3500
  },
  {
    id: 102,
    name: 'Banquete Tradicional Mexicano',
    asociateService: asociateServiceTs[1],
    baseSize: 25,
    maxSize: 50,
    priceAdd10: 800,
    killed: 0,
    basePrice: 8000
  },
  {
    id: 103,
    name: 'DJ Profesional con Equipo Premium',
    asociateService: asociateServiceTs[2],
    baseSize: 5,
    maxSize: 10,
    priceAdd10: 300,
    killed: 0,
    basePrice: 5000
  },
  {
    id: 104,
    name: 'Cobertura Fotográfica Premium',
    asociateService: asociateServiceTs[3],
    baseSize: 3,
    maxSize: 6,
    priceAdd10: 400,
    killed: 0,
    basePrice: 6000
  },
  {
    id: 105,
    name: 'Barra Libre Premium con Mixólogo',
    asociateService: asociateServiceTs[4],
    baseSize: 8,
    maxSize: 16,
    priceAdd10: 600,
    killed: 0,
    basePrice: 7000
  },
  {
    id: 106,
    name: 'Show de Stand-Up y Magia Interactiva',
    asociateService: asociateServiceTs[5],
    baseSize: 2,
    maxSize: 4,
    priceAdd10: 350,
    killed: 0,
    basePrice: 4500
  },
  {
    id: 107,
    name: 'Decoración Temática Personalizada',
    asociateService: asociateServiceTs[6],
    baseSize: 6,
    maxSize: 12,
    priceAdd10: 450,
    killed: 0,
    basePrice: 5500
  },
  {
    id: 108,
    name: 'Transporte Ejecutivo para Invitados',
    asociateService: asociateServiceTs[7],
    baseSize: 12,
    maxSize: 24,
    priceAdd10: 400,
    killed: 0,
    basePrice: 4800
  },
  {
    id: 109,
    name: 'Servicio de Seguridad Privada',
    asociateService: asociateServiceTs[8],
    baseSize: 4,
    maxSize: 8,
    priceAdd10: 350,
    killed: 0,
    basePrice: 5200
  },
  {
    id: 110,
    name: 'Coordinación Integral de Bodas',
    asociateService: asociateServiceTs[9],
    baseSize: 2,
    maxSize: 4,
    priceAdd10: 700,
    killed: 0,
    basePrice: 8500
  },
  {
    id: 111,
    name: 'Logística Completa de Eventos',
    asociateService: asociateServiceTs[10],
    baseSize: 3,
    maxSize: 6,
    priceAdd10: 650,
    killed: 0,
    basePrice: 7500
  },
  {
    id: 112,
    name: 'Transmisión en Vivo y Streaming',
    asociateService: asociateServiceTs[11],
    baseSize: 4,
    maxSize: 8,
    priceAdd10: 550,
    killed: 0,
    basePrice: 6500
  },
  {
    id: 113,
    name: 'Paquete Completo Banquete + Barra',
    asociateService: asociateServiceTs[1], // Usa el de banquete
    baseSize: 30,
    maxSize: 60,
    priceAdd10: 1200,
    killed: 0,
    basePrice: 12000
  },
  {
    id: 114,
    name: 'Combo Música y Espectáculo',
    asociateService: asociateServiceTs[2], // Usa el de DJ
    baseSize: 6,
    maxSize: 12,
    priceAdd10: 600,
    killed: 0,
    basePrice: 8500
  },
  {
    id: 115,
    name: 'Fotografía con Escenarios Decorados',
    asociateService: asociateServiceTs[3], // Usa el de fotografía
    baseSize: 4,
    maxSize: 8,
    priceAdd10: 550,
    killed: 0,
    basePrice: 9500
  },
  {
    id: 116,
    name: 'Transporte con Seguridad Incluida',
    asociateService: asociateServiceTs[7], // Usa el de transporte
    baseSize: 15,
    maxSize: 30,
    priceAdd10: 600,
    killed: 0,
    basePrice: 7800
  },
  {
    id: 117,
    name: 'Coordinación con Soporte Logístico',
    asociateService: asociateServiceTs[9], // Usa el de coordinación
    baseSize: 3,
    maxSize: 6,
    priceAdd10: 900,
    killed: 0,
    basePrice: 13500
  },
  {
    id: 118,
    name: 'Servicio de Meseros con Barra',
    asociateService: asociateServiceTs[0], // Usa el de meseros
    baseSize: 12,
    maxSize: 24,
    priceAdd10: 700,
    killed: 0,
    basePrice: 9000
  },
  {
    id: 119,
    name: 'DJ con Transmisión en Vivo',
    asociateService: asociateServiceTs[2], // Usa el de DJ
    baseSize: 6,
    maxSize: 12,
    priceAdd10: 650,
    killed: 0,
    basePrice: 9500
  },
  {
    id: 120,
    name: 'Paquete Premium Fotos + Música + Show',
    asociateService: asociateServiceTs[3], // Usa el de fotografía
    baseSize: 8,
    maxSize: 16,
    priceAdd10: 1100,
    killed: 0,
    basePrice: 16500
  },
  {
    id: 121,
    name: 'Decoración con Transporte Temático',
    asociateService: asociateServiceTs[6], // Usa el de decoración
    baseSize: 10,
    maxSize: 20,
    priceAdd10: 650,
    killed: 0,
    basePrice: 10300
  },
  {
    id: 122,
    name: 'Seguridad con Coordinación de Accesos',
    asociateService: asociateServiceTs[8], // Usa el de seguridad
    baseSize: 5,
    maxSize: 10,
    priceAdd10: 600,
    killed: 0,
    basePrice: 9800
  },
  {
    id: 123,
    name: 'Logística con Soporte Digital',
    asociateService: asociateServiceTs[10], // Usa el de logística
    baseSize: 4,
    maxSize: 8,
    priceAdd10: 750,
    killed: 0,
    basePrice: 11200
  },
  {
    id: 124,
    name: 'Servicio Integral de Alimentos y Bebidas',
    asociateService: asociateServiceTs[1], // Usa el de banquete
    baseSize: 35,
    maxSize: 70,
    priceAdd10: 1400,
    killed: 0,
    basePrice: 18500
  },
  {
    id: 125,
    name: 'Creación de Ambiente Completo',
    asociateService: asociateServiceTs[2], // Usa el de DJ
    baseSize: 12,
    maxSize: 24,
    priceAdd10: 950,
    killed: 0,
    basePrice: 15700
  },
  {
    id: 126,
    name: 'Evento Seguro con Memoria Fotográfica',
    asociateService: asociateServiceTs[3], // Usa el de fotografía
    baseSize: 6,
    maxSize: 12,
    priceAdd10: 850,
    killed: 0,
    basePrice: 14300
  },
  {
    id: 127,
    name: 'Fiesta Completa con Logística',
    asociateService: asociateServiceTs[4], // Usa el de bartender
    baseSize: 10,
    maxSize: 20,
    priceAdd10: 1000,
    killed: 0,
    basePrice: 16800
  },
  {
    id: 128,
    name: 'Experiencia Gastronómica con Música Digital',
    asociateService: asociateServiceTs[1], // Usa el de banquete
    baseSize: 28,
    maxSize: 56,
    priceAdd10: 1100,
    killed: 0,
    basePrice: 15200
  },
  {
    id: 129,
    name: 'Espacio Decorado y Seguro',
    asociateService: asociateServiceTs[6], // Usa el de decoración
    baseSize: 8,
    maxSize: 16,
    priceAdd10: 700,
    killed: 0,
    basePrice: 12600
  },
  {
    id: 130,
    name: 'Paquete Oro - Servicio Completo',
    asociateService: asociateServiceTs[0], // Usa el de meseros
    baseSize: 20,
    maxSize: 40,
    priceAdd10: 1800,
    killed: 0,
    basePrice: 25000
  }
];