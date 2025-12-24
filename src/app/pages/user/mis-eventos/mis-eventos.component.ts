import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventModel } from '../../../models/ms_reserve/EventModel';
import { EventService } from '../../../shared/ms_reserve/eventService.service';

@Component({
  selector: 'app-mis-eventos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mis-eventos.component.html',
  styleUrls: ['./mis-eventos.component.css']
})

export class MisEventosComponent implements OnInit {
  eventos: EventModel[] = []; // Aquí cargarías tu array de eventos desde el JSON
  mostrarModal = false;
  eventoSeleccionado: any = null;

  ngOnInit(): void {
    
  }

  constructor(private eventService: EventService) {
    this.loadEvents();
  }

  // Función para formatear fecha
  formatearFecha(fechaString: string): string {
    if (!fechaString) return 'Fecha no disponible';
    
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  // Función para formatear fecha completa (con hora)
  formatearFechaCompleta(fechaString: string): string {
    if (!fechaString) return 'Fecha no disponible';
    
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-MX', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Función para obtener iniciales del nombre de la terraza
  obtenerIniciales(nombre: string): string {
    if (!nombre) return '??';
    return nombre
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  // Función para obtener color según estado
  obtenerColorEstado(estado: string): string {
    const colores: { [key: string]: string } = {
      'Confirmado': '#4CAF50',
      'En curso': '#2196F3',
      'Completado': '#9E9E9E',
      'Cancelado': '#F44336',
      'Pendiente': '#FF9800'
    };
    return colores[estado] || '#757575';
  }

  // Función para ver detalles
  verDetalles(evento: any): void {
    this.eventoSeleccionado = evento;
    this.mostrarModal = true;
  }

  // Función para cerrar modal
  cerrarModal(): void {
    this.mostrarModal = false;
    this.eventoSeleccionado = null;
  }

  loadEvents(): void {
    try {
      this.eventService.getAll().subscribe({
        next: (data) => {
          this.eventos = data;},
        error: (error) => console.error('Error fetching events:', error)
      });
    } catch (error) {
      console.error('Error loading events:', error);
    }
  }
}