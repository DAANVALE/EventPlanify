import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ServicioTerraza {
  id: number;
  tipo: 'servicio' | 'terraza';
  nombre: string;
  descripcion: string;
  imagen?: string;
  capacidadBase?: number;
  capacidadMaxima?: number;
  precioBase: number;
  ubicacion?: string;
  direccion?: string;
  lugar?: string;
  ciudad?: string;
  tipoTerraza?: string;
  fechaCreacion: Date;
}

@Component({
  selector: 'app-mi-host',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mi-host.component.html',
  styleUrls: ['./mi-host.component.css']
})
export class MiHostComponent implements OnInit {
  mostrarModal = false;
  tipoSeleccionado: 'servicio' | 'terraza' | null = null;
  serviciosYTerrazas: ServicioTerraza[] = [];
  
  // Formulario
  formulario: Partial<ServicioTerraza> = {};
  imagenPreview: string | null = null;

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    // Cargar datos del localStorage
    const datosGuardados = localStorage.getItem('miHostData');
    if (datosGuardados) {
      this.serviciosYTerrazas = JSON.parse(datosGuardados);
    } else {
      // Generar datos de ejemplo
      this.serviciosYTerrazas = this.generarDatosEjemplo();
      this.guardarEnLocalStorage();
    }
  }

  generarDatosEjemplo(): ServicioTerraza[] {
    return [
      {
        id: 1,
        tipo: 'terraza',
        nombre: 'Jardín La Primavera',
        descripcion: 'Hermoso jardín al aire libre con capacidad para eventos grandes',
        imagen: 'https://images.unsplash.com/photo-1519167758481-83f29da8ae8d?w=800',
        capacidadBase: 100,
        capacidadMaxima: 200,
        precioBase: 25000,
        ubicacion: 'Zona Centro',
        direccion: 'Av. Juárez 123',
        lugar: 'Centro Histórico',
        ciudad: 'Guadalajara',
        tipoTerraza: 'Jardín',
        fechaCreacion: new Date('2024-01-15')
      },
      {
        id: 2,
        tipo: 'servicio',
        nombre: 'Banquete Premium',
        descripcion: 'Servicio de catering de alta calidad con menú personalizado',
        imagen: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800',
        capacidadBase: 50,
        capacidadMaxima: 300,
        precioBase: 15000,
        fechaCreacion: new Date('2024-02-20')
      },
      {
        id: 3,
        tipo: 'terraza',
        nombre: 'Salón Elegante',
        descripcion: 'Salón de eventos con decoración moderna y elegante',
        imagen: 'https://images.unsplash.com/photo-1519167758481-83f29da8ae8d?w=800',
        capacidadBase: 80,
        capacidadMaxima: 150,
        precioBase: 18000,
        ubicacion: 'Zona Minerva',
        direccion: 'Av. Chapultepec 456',
        lugar: 'Colonia Americana',
        ciudad: 'Guadalajara',
        tipoTerraza: 'Salón',
        fechaCreacion: new Date('2024-03-10')
      }
    ];
  }

  abrirModal(): void {
    this.mostrarModal = true;
    this.tipoSeleccionado = null;
    this.resetFormulario();
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.tipoSeleccionado = null;
    this.resetFormulario();
  }

  seleccionarTipo(tipo: 'servicio' | 'terraza'): void {
    this.tipoSeleccionado = tipo;
    this.formulario.tipo = tipo;
  }

  onImagenSeleccionada(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenPreview = e.target.result;
        this.formulario.imagen = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  guardarRegistro(): void {
    if (!this.validarFormulario()) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    const nuevoRegistro: ServicioTerraza = {
      id: Date.now(),
      tipo: this.tipoSeleccionado!,
      nombre: this.formulario.nombre!,
      descripcion: this.formulario.descripcion!,
      imagen: this.formulario.imagen || this.obtenerImagenPorDefecto(),
      capacidadBase: this.formulario.capacidadBase,
      capacidadMaxima: this.formulario.capacidadMaxima,
      precioBase: this.formulario.precioBase!,
      ubicacion: this.formulario.ubicacion,
      direccion: this.formulario.direccion,
      lugar: this.formulario.lugar,
      ciudad: this.formulario.ciudad,
      tipoTerraza: this.formulario.tipoTerraza,
      fechaCreacion: new Date()
    };

    this.serviciosYTerrazas.unshift(nuevoRegistro);
    this.guardarEnLocalStorage();
    this.cerrarModal();
    
    alert(`${this.tipoSeleccionado === 'servicio' ? 'Servicio' : 'Terraza'} registrado exitosamente!`);
  }

  validarFormulario(): boolean {
    if (!this.formulario.nombre || !this.formulario.descripcion || !this.formulario.precioBase) {
      return false;
    }

    if (this.tipoSeleccionado === 'terraza') {
      return !!(this.formulario.ubicacion && this.formulario.direccion && 
                this.formulario.lugar && this.formulario.ciudad && this.formulario.tipoTerraza);
    }

    return true;
  }

  obtenerImagenPorDefecto(): string {
    return this.tipoSeleccionado === 'terraza' 
      ? 'https://images.unsplash.com/photo-1519167758481-83f29da8ae8d?w=800'
      : 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800';
  }

  resetFormulario(): void {
    this.formulario = {};
    this.imagenPreview = null;
  }

  guardarEnLocalStorage(): void {
    localStorage.setItem('miHostData', JSON.stringify(this.serviciosYTerrazas));
  }

  editarRegistro(item: ServicioTerraza): void {
    this.formulario = { ...item };
    this.tipoSeleccionado = item.tipo;
    this.imagenPreview = item.imagen || null;
    this.mostrarModal = true;
  }

  eliminarRegistro(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      this.serviciosYTerrazas = this.serviciosYTerrazas.filter(item => item.id !== id);
      this.guardarEnLocalStorage();
    }
  }

  obtenerIconoTipo(tipo: string): string {
    return tipo === 'terraza' ? '🏛️' : '🎉';
  }

  filtrarPorTipo(tipo: 'servicio' | 'terraza' | 'todos'): ServicioTerraza[] {
    if (tipo === 'todos') {
      return this.serviciosYTerrazas;
    }
    return this.serviciosYTerrazas.filter(item => item.tipo === tipo);
  }
}