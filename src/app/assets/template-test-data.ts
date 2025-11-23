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

export const serviceTypeTs: ServiceTypeModel[] = [
  { id: 1, kind: 'Meseros' },
  { id: 2, kind: 'Fotógrafos' },
  { id: 3, kind: 'Comida' },
  { id: 4, kind: 'Bartender' },
  { id: 5, kind: 'Música' },
  { id: 6, kind: 'Entretenimiento' },
  { id: 7, kind: 'Decoración' },
  { id: 8, kind: 'Transporte' },
  { id: 9, kind: 'Seguridad' },
  { id: 10, kind: 'Coordinación' },
  { id: 11, kind: 'Logística' },
  { id: 12, kind: 'Digital' }
];

export const cityModelTs: CityModel[] = [
  { id: 1, kind: 'Guadalajara' },
  { id: 2, kind: 'Zapopan' },
  { id: 3, kind: 'Tlaquepaque' },
  { id: 4, kind: 'Tonalá' },
  { id: 5, kind: 'Zapotlanejo' },
  { id: 6, kind: 'Tlajomulco' },
  { id: 7, kind: 'El Salto' },
  { id: 8, kind: 'Ixtlahuacán de los Membrillos' },
  { id: 9, kind: 'Juanacatlán' },
  { id: 10, kind: 'San Pedro Tlaquepaque' }
];

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
    URL_IMG: ['https://example.com/images/meseros-elegantes.jpg'],
    name: 'Servicio de Meseros Elegantes',
    description: 'Meseros capacitados para eventos de alto nivel con uniforme formal.',
    price: 3500,
    tags: []
  },
  {
    id: 2,
    serviceType: [serviceTypeTs[2]], // Comida
    cityModel: [cityModelTs[1]],     // Zapopan
    idService_DB: 102,
    idAsociate_DB: 202,
    URL_IMG: ['https://example.com/images/banquete-mexicano.jpg'],
    name: 'Banquete Tradicional Mexicano',
    description: 'Comida mexicana gourmet para todo tipo de eventos con sabores auténticos.',
    price: 8000,
    tags: []
  },
  {
    id: 3,
    serviceType: [serviceTypeTs[4]], // Música
    cityModel: [cityModelTs[2]],     // Tlaquepaque
    idService_DB: 103,
    idAsociate_DB: 203,
    URL_IMG: ['https://example.com/images/dj-profesional.jpg'],
    name: 'DJ Profesional con Equipo Premium',
    description: 'DJ con equipo profesional, playlist personalizada y efectos de luz.',
    price: 5000,
    tags: []
  },
  {
    id: 4,
    serviceType: [serviceTypeTs[1]], // Fotógrafos
    cityModel: [cityModelTs[3]],     // Tonalá
    idService_DB: 104,
    idAsociate_DB: 204,
    URL_IMG: ['https://example.com/images/fotografia-premium.jpg'],
    name: 'Cobertura Fotográfica Premium',
    description: 'Fotografía profesional con entrega en digital, álbum físico y sesión de retratos.',
    price: 6000,
    tags: []
  },
  {
    id: 5,
    serviceType: [serviceTypeTs[3]], // Bartender
    cityModel: [cityModelTs[4]],     // Zapotlanejo
    idService_DB: 105,
    idAsociate_DB: 205,
    URL_IMG: ['https://example.com/images/barra-premium.jpg'],
    name: 'Barra Libre Premium con Mixólogo',
    description: 'Cocteles ilimitados con barra temática, mixólogo profesional y ingredientes premium.',
    price: 7000,
    tags: []
  },
  {
    id: 6,
    serviceType: [serviceTypeTs[5]], // Entretenimiento
    cityModel: [cityModelTs[5]],     // Tlajomulco
    idService_DB: 106,
    idAsociate_DB: 206,
    URL_IMG: ['https://example.com/images/show-standup.jpg'],
    name: 'Show de Stand-Up y Magia Interactiva',
    description: 'Entretenimiento divertido para todas las edades con participación del público.',
    price: 4500,
    tags: []
  },
  {
    id: 7,
    serviceType: [serviceTypeTs[6]], // Decoración
    cityModel: [cityModelTs[0]],     // Guadalajara
    idService_DB: 107,
    idAsociate_DB: 207,
    URL_IMG: ['https://example.com/images/decoracion-tematica.jpg'],
    name: 'Decoración Temática Personalizada',
    description: 'Decoración completa según tema del evento con diseño exclusivo.',
    price: 5500,
    tags: []
  },
  {
    id: 8,
    serviceType: [serviceTypeTs[7]], // Transporte
    cityModel: [cityModelTs[1]],     // Zapopan
    idService_DB: 108,
    idAsociate_DB: 208,
    URL_IMG: ['https://example.com/images/transporte-ejecutivo.jpg'],
    name: 'Transporte Ejecutivo para Invitados',
    description: 'Flotilla de vehículos ejecutivos con chofer profesional para traslado de invitados.',
    price: 4800,
    tags: []
  },
  {
    id: 9,
    serviceType: [serviceTypeTs[8]], // Seguridad
    cityModel: [cityModelTs[2]],     // Tlaquepaque
    idService_DB: 109,
    idAsociate_DB: 209,
    URL_IMG: ['https://example.com/images/seguridad-privada.jpg'],
    name: 'Servicio de Seguridad Privada',
    description: 'Personal de seguridad uniformado con equipo de comunicación y protocolos de seguridad.',
    price: 5200,
    tags: []
  },
  {
    id: 10,
    serviceType: [serviceTypeTs[9]], // Coordinación
    cityModel: [cityModelTs[3]],     // Tonalá
    idService_DB: 110,
    idAsociate_DB: 210,
    URL_IMG: ['https://example.com/images/coordinacion-bodas.jpg'],
    name: 'Coordinación Integral de Bodas',
    description: 'Coordinación completa de ceremonia y recepción con planificación detallada.',
    price: 8500,
    tags: []
  },
  {
    id: 11,
    serviceType: [serviceTypeTs[10]], // Logística
    cityModel: [cityModelTs[4]],     // Zapotlanejo
    idService_DB: 111,
    idAsociate_DB: 211,
    URL_IMG: ['https://example.com/images/logistica-eventos.jpg'],
    name: 'Logística Completa de Eventos',
    description: 'Planificación y ejecución logística para eventos de cualquier magnitud.',
    price: 7500,
    tags: []
  },
  {
    id: 12,
    serviceType: [serviceTypeTs[11]], // Digital
    cityModel: [cityModelTs[5]],     // Tlajomulco
    idService_DB: 112,
    idAsociate_DB: 212,
    URL_IMG: ['https://example.com/images/streaming-profesional.jpg'],
    name: 'Transmisión en Vivo y Streaming',
    description: 'Transmisión profesional en HD con múltiples cámaras y equipo de audio.',
    price: 6500,
    tags: []
  },
  {
    id: 13,
    serviceType: [serviceTypeTs[2], serviceTypeTs[3]], // Comida y Bartender
    cityModel: [cityModelTs[0]],     // Guadalajara
    idService_DB: 113,
    idAsociate_DB: 213,
    URL_IMG: ['https://example.com/images/paquete-completo.jpg'],
    name: 'Paquete Completo Banquete + Barra',
    description: 'Servicio integral de alimentación y bebidas con menú personalizado.',
    price: 12000,
    tags: []
  },
  {
    id: 14,
    serviceType: [serviceTypeTs[4], serviceTypeTs[5]], // Música y Entretenimiento
    cityModel: [cityModelTs[1]],     // Zapopan
    idService_DB: 114,
    idAsociate_DB: 214,
    URL_IMG: ['../assets/testImg/terrace.jpeg'],
    name: 'Combo Música y Espectáculo',
    description: 'DJ profesional con show de entretenimiento incluido para toda la noche.',
    price: 8500,
    tags: []
  },
  {
    id: 15,
    serviceType: [serviceTypeTs[1], serviceTypeTs[6]], // Fotografía y Decoración
    cityModel: [cityModelTs[2]],     // Tlaquepaque
    idService_DB: 115,
    idAsociate_DB: 215,
    URL_IMG: ['https://example.com/images/foto-decoracion.jpg'],
    name: 'Fotografía con Escenarios Decorados',
    description: 'Sesión fotográfica en escenarios especialmente decorados para el evento.',
    price: 9500,
    tags: []
  },
  {
    id: 16,
    serviceType: [serviceTypeTs[7], serviceTypeTs[8]], // Transporte y Seguridad
    cityModel: [cityModelTs[3]],     // Tonalá
    idService_DB: 116,
    idAsociate_DB: 216,
    URL_IMG: ['https://example.com/images/transporte-seguridad.jpg'],
    name: 'Transporte con Seguridad Incluida',
    description: 'Servicio de transporte con medidas de seguridad y escolta profesional.',
    price: 7800,
    tags: []
  },
  {
    id: 17,
    serviceType: [serviceTypeTs[9], serviceTypeTs[10]], // Coordinación y Logística
    cityModel: [cityModelTs[4]],     // Zapotlanejo
    idService_DB: 117,
    idAsociate_DB: 217,
    URL_IMG: ['https://example.com/images/coordinacion-logistica.jpg'],
    name: 'Coordinación con Soporte Logístico',
    description: 'Coordinación de evento con gestión logística completa y personal dedicado.',
    price: 13500,
    tags: []
  },
  {
    id: 18,
    serviceType: [serviceTypeTs[0], serviceTypeTs[3]], // Meseros y Bartender
    cityModel: [cityModelTs[5]],     // Tlajomulco
    idService_DB: 118,
    idAsociate_DB: 218,
    URL_IMG: ['https://example.com/images/meseros-bartender.jpg'],
    name: 'Servicio de Meseros con Barra',
    description: 'Personal de servicio completo incluyendo meseros y personal de barra.',
    price: 9000,
    tags: []
  },
  {
    id: 19,
    serviceType: [serviceTypeTs[4], serviceTypeTs[11]], // Música y Digital
    cityModel: [cityModelTs[0]],     // Guadalajara
    idService_DB: 119,
    idAsociate_DB: 219,
    URL_IMG: ['../assets/testImg/terrace.jpeg', '../assets/testImg/terrace.jpeg'],
    name: 'DJ con Transmisión en Vivo',
    description: 'Servicio de DJ profesional con transmisión en vivo incluida para invitados remotos.',
    price: 9500,
    tags: []
  },
  {
    id: 20,
    serviceType: [serviceTypeTs[1], serviceTypeTs[4], serviceTypeTs[5]], // Fotografía, Música, Entretenimiento
    cityModel: [cityModelTs[1]],     // Zapopan
    idService_DB: 120,
    idAsociate_DB: 220,
    URL_IMG: ['https://example.com/images/paquete-premium.jpg'],
    name: 'Paquete Premium Fotos + Música + Show',
    description: 'Combo completo de entretenimiento con fotografía profesional, música y espectáculo.',
    price: 16500,
    tags: []
  },
  {
    id: 21,
    serviceType: [serviceTypeTs[6], serviceTypeTs[7]], // Decoración y Transporte
    cityModel: [cityModelTs[2]],     // Tlaquepaque
    idService_DB: 121,
    idAsociate_DB: 221,
    URL_IMG: ['https://example.com/images/decoracion-transporte.jpg'],
    name: 'Decoración con Transporte Temático',
    description: 'Decoración completa incluyendo transporte decorado según tema del evento.',
    price: 10300,
    tags: []
  },
  {
    id: 22,
    serviceType: [serviceTypeTs[8], serviceTypeTs[9]], // Seguridad y Coordinación
    cityModel: [cityModelTs[3]],     // Tonalá
    idService_DB: 122,
    idAsociate_DB: 222,
    URL_IMG: ['https://example.com/images/seguridad-coordinacion.jpg'],
    name: 'Seguridad con Coordinación de Accesos',
    description: 'Servicio de seguridad con coordinación de accesos y control de invitados.',
    price: 9800,
    tags: []
  },
  {
    id: 23,
    serviceType: [serviceTypeTs[10], serviceTypeTs[11]], // Logística y Digital
    cityModel: [cityModelTs[4]],     // Zapotlanejo
    idService_DB: 123,
    idAsociate_DB: 223,
    URL_IMG: ['https://example.com/images/logistica-digital.jpg'],
    name: 'Logística con Soporte Digital',
    description: 'Gestión logística completa con plataforma digital para seguimiento del evento.',
    price: 11200,
    tags: []
  },
  {
    id: 24,
    serviceType: [serviceTypeTs[0], serviceTypeTs[2], serviceTypeTs[3]], // Meseros, Comida, Bartender
    cityModel: [cityModelTs[5]],     // Tlajomulco
    idService_DB: 124,
    idAsociate_DB: 224,
    URL_IMG: ['https://example.com/images/servicio-alimentos.jpg'],
    name: 'Servicio Integral de Alimentos y Bebidas',
    description: 'Servicio completo de alimentación incluyendo personal, comida y bebidas.',
    price: 18500,
    tags: []
  },
  {
    id: 25,
    serviceType: [serviceTypeTs[4], serviceTypeTs[6], serviceTypeTs[7]], // Música, Decoración, Transporte
    cityModel: [cityModelTs[0]],     // Guadalajara
    idService_DB: 125,
    idAsociate_DB: 225,
    URL_IMG: ['https://example.com/images/ambiente-completo.jpg'],
    name: 'Creación de Ambiente Completo',
    description: 'Servicio para crear ambiente perfecto con música, decoración y transporte temático.',
    price: 15700,
    tags: []
  },
  {
    id: 26,
    serviceType: [serviceTypeTs[1], serviceTypeTs[8], serviceTypeTs[9]], // Fotografía, Seguridad, Coordinación
    cityModel: [cityModelTs[1]],     // Zapopan
    idService_DB: 126,
    idAsociate_DB: 226,
    URL_IMG: ['https://example.com/images/evento-seguro.jpg'],
    name: 'Evento Seguro con Memoria Fotográfica',
    description: 'Coordinación segura del evento con cobertura fotográfica profesional.',
    price: 14300,
    tags: []
  },
  {
    id: 27,
    serviceType: [serviceTypeTs[3], serviceTypeTs[5], serviceTypeTs[10]], // Bartender, Entretenimiento, Logística
    cityModel: [cityModelTs[2]],     // Tlaquepaque
    idService_DB: 127,
    idAsociate_DB: 227,
    URL_IMG: ['https://example.com/images/fiesta-completa.jpg'],
    name: 'Fiesta Completa con Logística',
    description: 'Organización completa de fiesta con barra, entretenimiento y gestión logística.',
    price: 16800,
    tags: []
  },
  {
    id: 28,
    serviceType: [serviceTypeTs[2], serviceTypeTs[4], serviceTypeTs[11]], // Comida, Música, Digital
    cityModel: [cityModelTs[3]],     // Tonalá
    idService_DB: 128,
    idAsociate_DB: 228,
    URL_IMG: ['https://example.com/images/experiencia-digital.jpg'],
    name: 'Experiencia Gastronómica con Música Digital',
    description: 'Banquete gourmet con experiencia musical digital y transmisión en vivo.',
    price: 15200,
    tags: []
  },
  {
    id: 29,
    serviceType: [serviceTypeTs[6], serviceTypeTs[8], serviceTypeTs[10]], // Decoración, Seguridad, Logística
    cityModel: [cityModelTs[4]],     // Zapotlanejo
    idService_DB: 129,
    idAsociate_DB: 229,
    URL_IMG: ['https://example.com/images/espacio-seguro.jpg'],
    name: 'Espacio Decorado y Seguro',
    description: 'Decoración temática con medidas de seguridad y gestión logística integrada.',
    price: 12600,
    tags: []
  },
  {
    id: 30,
    serviceType: [serviceTypeTs[0], serviceTypeTs[1], serviceTypeTs[3], serviceTypeTs[4], serviceTypeTs[5]], // Todos los servicios principales
    cityModel: [cityModelTs[5]],     // Tlajomulco
    idService_DB: 130,
    idAsociate_DB: 230,
    URL_IMG: ['https://example.com/images/paquete-oro.jpg'],
    name: 'Paquete Oro - Servicio Completo',
    description: 'Servicio integral premium incluyendo todos los servicios principales para evento de lujo.',
    price: 25000,
    tags: []
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
    place: 'Zona Real',
    tags: []
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
    place: 'Colonia Seattle',
    tags: []
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
    place: 'Centro Histórico',
    tags: []
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
    place: 'Zona Artesanal',
    tags: []
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
    place: 'Paraje El Roble',
    tags: []
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
    place: 'Bosques de Santa Anita',
    tags: []
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
