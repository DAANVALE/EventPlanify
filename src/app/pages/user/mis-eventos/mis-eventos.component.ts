import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface EventoReservado {
  id: number;
  nombre: string;
  fecha: string;
  terraza: {
    nombre: string;
    imagen: string;
    ubicacion: string;
  };
  servicios: Array<{
    nombre: string;
    tipo: string;
  }>;
  precioTotal: number;
  estado: string;
}

@Component({
  selector: 'app-mis-eventos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mis-eventos.component.html',
  styleUrls: ['./mis-eventos.component.css']
})
export class MisEventosComponent implements OnInit {
  eventos: EventoReservado[] = [];
  eventoSeleccionado: EventoReservado | null = null;
  mostrarModal = false;

  constructor() {}

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos(): void {
    // Cargar evento confirmado del localStorage
    const eventoConfirmado = localStorage.getItem('eventoConfirmado');
    
    if (eventoConfirmado) {
      const evento = JSON.parse(eventoConfirmado);
      this.eventos.push(this.transformarEventoConfirmado(evento));
    }

    // Agregar eventos de ejemplo ficticios
    this.eventos.push(...this.generarEventosFicticios());
  }

  transformarEventoConfirmado(evento: any): EventoReservado {
    return {
      id: 1,
      nombre: evento.template?.name || 'Mi Evento Confirmado',
      fecha: new Date().toLocaleDateString('es-MX', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      terraza: {
        nombre: evento.terraza?.name || 'Terraza Seleccionada',
        imagen: evento.terraza?.URL_Img?.[0] || 'assets/default-terraza.jpg',
        ubicacion: evento.terraza?.place || 'Ubicación no especificada'
      },
      servicios: evento.servicios?.map((s: any, index: number) => ({
        nombre: s.name || `Servicio ${index + 1}`,
        tipo: s.serviceType?.[0]?.kind || 'Servicio General'
      })) || [],
      precioTotal: this.calcularPrecioTotal(evento),
      estado: 'Confirmado'
    };
  }

  calcularPrecioTotal(evento: any): number {
    let total = 0;
    
    if (evento.terraza?.price) {
      total += parseFloat(evento.terraza.price);
    }
    
    if (evento.servicios) {
      evento.servicios.forEach((s: any) => {
        if (s.price) {
          total += parseFloat(s.price);
        }
      });
    }
    
    return total;
  }

  generarEventosFicticios(): EventoReservado[] {
    return [
      {
        id: 2,
        nombre: 'Boda de Ensueño',
        fecha: '15 de Enero, 2025',
        terraza: {
          nombre: 'Jardín La Primavera',
          imagen: 'https://images.unsplash.com/photo-1519167758481-83f29da8ae8d?w=800',
          ubicacion: 'Guadalajara, Jalisco'
        },
        servicios: [
          { nombre: 'Banquete Premium', tipo: 'Catering' },
          { nombre: 'Decoración Floral', tipo: 'Decoración' },
          { nombre: 'Fotografía Profesional', tipo: 'Fotografía' }
        ],
        precioTotal: 75000,
        estado: 'Próximo'
      },
      {
        id: 3,
        nombre: 'Cumpleaños Infantil',
        fecha: '20 de Febrero, 2025',
        terraza: {
          nombre: 'Salón Mágico',
          imagen: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800',
          ubicacion: 'Zapopan, Jalisco'
        },
        servicios: [
          { nombre: 'Animación Infantil', tipo: 'Entretenimiento' },
          { nombre: 'Catering Infantil', tipo: 'Catering' },
          { nombre: 'Decoración Temática', tipo: 'Decoración' }
        ],
        precioTotal: 18000,
        estado: 'Próximo'
      },
      {
        id: 4,
        nombre: 'Evento Corporativo',
        fecha: '5 de Diciembre, 2024',
        terraza: {
          nombre: 'Centro de Convenciones Elite',
          imagen: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
          ubicacion: 'Guadalajara, Jalisco'
        },
        servicios: [
          { nombre: 'Coffee Break', tipo: 'Catering' },
          { nombre: 'Equipo Audiovisual', tipo: 'Tecnología' },
          { nombre: 'Servicio de Valet Parking', tipo: 'Servicios' }
        ],
        precioTotal: 45000,
        estado: 'Completado'
      }
    ];
  }

  verDetalles(evento: EventoReservado): void {
    this.eventoSeleccionado = evento;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.eventoSeleccionado = null;
  }

  obtenerColorEstado(estado: string): string {
    switch(estado) {
      case 'Confirmado':
        return '#10b981';
      case 'Próximo':
        return '#3b82f6';
      case 'Completado':
        return '#6b7280';
      default:
        return '#8b5cf6';
    }
  }
}