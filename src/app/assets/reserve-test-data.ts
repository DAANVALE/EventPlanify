
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
    id: 501,
    idUser: 101,
    name: 'Servicios Premium GDL',
    mail: 'premiumgdl@example.com',
    phone: '33-1234-5678',
    killed: false
  },
  {
    id: 502,
    idUser: 102,
    name: 'Eventos Zapopan',
    mail: 'eventoszapopan@example.com',
    phone: '33-2345-6789',
    killed: false
  },
  {
    id: 503,
    idUser: 103,
    name: 'Salones Tlaquepaque',
    mail: 'salonestlaquepaque@example.com',
    phone: '33-3456-7890',
    killed: false
  },
  {
    id: 504,
    idUser: 104,
    name: 'Expo Servicios Tonalá',
    mail: 'exposerviciostonala@example.com',
    phone: '33-4567-8901',
    killed: false
  },
  {
    id: 505,
    idUser: 105,
    name: 'Naturaleza y Eventos',
    mail: 'naturalezayeventos@example.com',
    phone: '33-5678-9012',
    killed: false
  },
  {
    id: 506,
    idUser: 106,
    name: 'Experiencias Únicas',
    mail: 'experienciasunicas@example.com',
    phone: '33-6789-0123',
    killed: false
  },
  {
    id: 507,
    idUser: 107,
    name: 'Catering Elite',
    mail: 'cateringelite@example.com',
    phone: '33-7890-1234',
    killed: false
  },
  {
    id: 508,
    idUser: 108,
    name: 'Sonido e Iluminación Pro',
    mail: 'sonidoiluminacion@example.com',
    phone: '33-8901-2345',
    killed: false
  },
  {
    id: 509,
    idUser: 109,
    name: 'Decoraciones Elegantes',
    mail: 'decoracioneselegantes@example.com',
    phone: '33-9012-3456',
    killed: false
  },
  {
    id: 510,
    idUser: 110,
    name: 'Transporte Ejecutivo',
    mail: 'transporteejecutivo@example.com',
    phone: '33-0123-4567',
    killed: false
  },
  {
    id: 511,
    idUser: 111,
    name: 'Seguridad Privada',
    mail: 'seguridadprivada@example.com',
    phone: '33-1122-3344',
    killed: false
  },
  {
    id: 512,
    idUser: 112,
    name: 'Fotografía Profesional',
    mail: 'fotografiaprofesional@example.com',
    phone: '33-2233-4455',
    killed: false
  },
  {
    id: 513,
    idUser: 113,
    name: 'Audio y Video',
    mail: 'audiovideo@example.com',
    phone: '33-3344-5566',
    killed: false
  },
  {
    id: 514,
    idUser: 114,
    name: 'Flores y Arreglos',
    mail: 'floresyarreglos@example.com',
    phone: '33-4455-6677',
    killed: false
  },
  {
    id: 515,
    idUser: 115,
    name: 'Mobiliario para Eventos',
    mail: 'mobiliarioeventos@example.com',
    phone: '33-5566-7788',
    killed: false
  },
  {
    id: 516,
    idUser: 116,
    name: 'Animación y Entretenimiento',
    mail: 'animacionentretenimiento@example.com',
    phone: '33-6677-8899',
    killed: false
  },
  {
    id: 517,
    idUser: 117,
    name: 'Coordinación de Bodas',
    mail: 'coordinacionbodas@example.com',
    phone: '33-7788-9900',
    killed: false
  },
  {
    id: 518,
    idUser: 118,
    name: 'Servicios Corporativos',
    mail: 'servicioscorporativos@example.com',
    phone: '33-8899-0011',
    killed: false
  },
  {
    id: 519,
    idUser: 119,
    name: 'Logística de Eventos',
    mail: 'logisticaeventos@example.com',
    phone: '33-9900-1122',
    killed: false
  },
  {
    id: 520,
    idUser: 120,
    name: 'Servicios Digitales',
    mail: 'serviciosdigitales@example.com',
    phone: '33-0011-2233',
    killed: false
  }
];


export const ServiceModelTs: ServiceModel[] = [
  {
    id: 1,
    name: 'Servicio de Alberca Premium',
    asociateServiceModel: asociateServiceModelTs[0],
    baseSize: 50,
    maxSize: 100,
    priceAdd10: 800,
    direction: 'Av. Patria 1234, Zona Real, Guadalajara',
    killed: false
  },
  {
    id: 2,
    name: 'Servicio Tradicional Completo',
    asociateServiceModel: asociateServiceModelTs[1],
    baseSize: 40,
    maxSize: 80,
    priceAdd10: 600,
    direction: 'Calzada Seattle 567, Colonia Seattle, Zapopan',
    killed: false
  },
  {
    id: 3,
    name: 'Servicio de Salón Ejecutivo',
    asociateServiceModel: asociateServiceModelTs[2],
    baseSize: 60,
    maxSize: 120,
    priceAdd10: 900,
    direction: 'Independencia 890, Centro Histórico, Tlaquepaque',
    killed: false
  },
  {
    id: 4,
    name: 'Servicio para Exposiciones',
    asociateServiceModel: asociateServiceModelTs[3],
    baseSize: 70,
    maxSize: 150,
    priceAdd10: 700,
    direction: 'Cerámica 234, Zona Artesanal, Tonalá',
    killed: false
  },
  {
    id: 5,
    name: 'Servicio en Área Natural',
    asociateServiceModel: asociateServiceModelTs[4],
    baseSize: 30,
    maxSize: 60,
    priceAdd10: 750,
    direction: 'Carretera a Zapotlanejo Km 12.5, Paraje El Roble, Zapotlanejo',
    killed: false
  },
  {
    id: 6,
    name: 'Servicio de Experiencia 360',
    asociateServiceModel: asociateServiceModelTs[5],
    baseSize: 45,
    maxSize: 90,
    priceAdd10: 1200,
    direction: 'Bosques de Santa Anita 345, Tlajomulco',
    killed: false
  },
  {
    id: 7,
    name: 'Catering Gourmet Premium',
    asociateServiceModel: asociateServiceModelTs[6],
    baseSize: 25,
    maxSize: 50,
    priceAdd10: 500,
    direction: 'Av. Vallarta 789, Centro, Guadalajara',
    killed: false
  },
  {
    id: 8,
    name: 'Sistema de Sonido Profesional',
    asociateServiceModel: asociateServiceModelTs[7],
    baseSize: 10,
    maxSize: 20,
    priceAdd10: 300,
    direction: 'López Mateos 321, Zapopan',
    killed: false
  },
  {
    id: 9,
    name: 'Decoración Temática Premium',
    asociateServiceModel: asociateServiceModelTs[8],
    baseSize: 15,
    maxSize: 30,
    priceAdd10: 400,
    direction: 'Juárez 654, Tlaquepaque',
    killed: false
  },
  {
    id: 10,
    name: 'Transporte Ejecutivo VIP',
    asociateServiceModel: asociateServiceModelTs[9],
    baseSize: 8,
    maxSize: 16,
    priceAdd10: 350,
    direction: 'Federalismo 987, Guadalajara',
    killed: false
  },
  {
    id: 11,
    name: 'Servicio de Seguridad Privada',
    asociateServiceModel: asociateServiceModelTs[10],
    baseSize: 5,
    maxSize: 10,
    priceAdd10: 450,
    direction: 'Américas 555, Zapopan',
    killed: false
  },
  {
    id: 12,
    name: 'Sesión Fotográfica Profesional',
    asociateServiceModel: asociateServiceModelTs[11],
    baseSize: 3,
    maxSize: 6,
    priceAdd10: 600,
    direction: 'Chapultepec 222, Guadalajara',
    killed: false
  },
  {
    id: 13,
    name: 'Grabación y Edición de Video',
    asociateServiceModel: asociateServiceModelTs[12],
    baseSize: 4,
    maxSize: 8,
    priceAdd10: 550,
    direction: 'Av. México 333, Guadalajara',
    killed: false
  },
  {
    id: 14,
    name: 'Arreglos Florales Premium',
    asociateServiceModel: asociateServiceModelTs[13],
    baseSize: 12,
    maxSize: 24,
    priceAdd10: 350,
    direction: 'San Felipe 444, Tlaquepaque',
    killed: false
  },
  {
    id: 15,
    name: 'Renta de Mobiliario Elegante',
    asociateServiceModel: asociateServiceModelTs[14],
    baseSize: 20,
    maxSize: 40,
    priceAdd10: 480,
    direction: 'Av. Revolución 777, Guadalajara',
    killed: false
  },
  {
    id: 16,
    name: 'Show de Entretenimiento',
    asociateServiceModel: asociateServiceModelTs[15],
    baseSize: 6,
    maxSize: 12,
    priceAdd10: 700,
    direction: 'Av. Acueducto 888, Zapopan',
    killed: false
  },
  {
    id: 17,
    name: 'Coordinación de Boda Completa',
    asociateServiceModel: asociateServiceModelTs[16],
    baseSize: 2,
    maxSize: 4,
    priceAdd10: 850,
    direction: 'Av. López Cotilla 999, Guadalajara',
    killed: false
  },
  {
    id: 18,
    name: 'Organización de Eventos Corporativos',
    asociateServiceModel: asociateServiceModelTs[17],
    baseSize: 3,
    maxSize: 6,
    priceAdd10: 900,
    direction: 'Av. Patria 1111, Zapopan',
    killed: false
  },
  {
    id: 19,
    name: 'Logística Integral de Eventos',
    asociateServiceModel: asociateServiceModelTs[18],
    baseSize: 5,
    maxSize: 10,
    priceAdd10: 750,
    direction: 'Av. Guadalupe 2222, Guadalajara',
    killed: false
  },
  {
    id: 20,
    name: 'Servicios Digitales y Streaming',
    asociateServiceModel: asociateServiceModelTs[19],
    baseSize: 8,
    maxSize: 16,
    priceAdd10: 650,
    direction: 'Av. Tepeyac 3333, Zapopan',
    killed: false
  },
  {
    id: 21,
    name: 'Barra de Bebidas Premium',
    asociateServiceModel: asociateServiceModelTs[6],
    baseSize: 15,
    maxSize: 30,
    priceAdd10: 420,
    direction: 'Av. La Paz 4444, Guadalajara',
    killed: false
  },
  {
    id: 22,
    name: 'Iluminación Profesional',
    asociateServiceModel: asociateServiceModelTs[7],
    baseSize: 8,
    maxSize: 16,
    priceAdd10: 380,
    direction: 'Av. Hidalgo 5555, Tlaquepaque',
    killed: false
  },
  {
    id: 23,
    name: 'Centros de Mesa Personalizados',
    asociateServiceModel: asociateServiceModelTs[8],
    baseSize: 10,
    maxSize: 20,
    priceAdd10: 320,
    direction: 'Av. Cristóbal Colón 6666, Guadalajara',
    killed: false
  },
  {
    id: 24,
    name: 'Transporte para Invitados',
    asociateServiceModel: asociateServiceModelTs[9],
    baseSize: 12,
    maxSize: 24,
    priceAdd10: 480,
    direction: 'Av. Circunvalación 7777, Zapopan',
    killed: false
  },
  {
    id: 25,
    name: 'Vigilancia con Personal Uniformado',
    asociateServiceModel: asociateServiceModelTs[10],
    baseSize: 6,
    maxSize: 12,
    priceAdd10: 520,
    direction: 'Av. Inglaterra 8888, Guadalajara',
    killed: false
  },
  {
    id: 26,
    name: 'Álbum Fotográfico de Lujo',
    asociateServiceModel: asociateServiceModelTs[11],
    baseSize: 2,
    maxSize: 4,
    priceAdd10: 680,
    direction: 'Av. España 9999, Tlaquepaque',
    killed: false
  },
  {
    id: 27,
    name: 'Video Documental del Evento',
    asociateServiceModel: asociateServiceModelTs[12],
    baseSize: 3,
    maxSize: 6,
    priceAdd10: 720,
    direction: 'Av. Francia 1010, Guadalajara',
    killed: false
  },
  {
    id: 28,
    name: 'Decoración con Flores Frescas',
    asociateServiceModel: asociateServiceModelTs[13],
    baseSize: 18,
    maxSize: 36,
    priceAdd10: 420,
    direction: 'Av. Italia 1111, Zapopan',
    killed: false
  },
  {
    id: 29,
    name: 'Mobiliario para Jardín',
    asociateServiceModel: asociateServiceModelTs[14],
    baseSize: 25,
    maxSize: 50,
    priceAdd10: 380,
    direction: 'Av. Alemania 1212, Guadalajara',
    killed: false
  },
  {
    id: 30,
    name: 'Espectáculo de Fuegos Artificiales',
    asociateServiceModel: asociateServiceModelTs[15],
    baseSize: 1,
    maxSize: 2,
    priceAdd10: 950,
    direction: 'Av. Japón 1313, Tlaquepaque',
    killed: false
  }
];