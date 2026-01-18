import { CityModel } from '../../../models/ms_template/city-type';
import { ServiceTypeModel } from '../../../models/ms_template/service-type';
import { TerraceTypeModel } from '../../../models/ms_template/terrace-type';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ImportsModule } from '../../../imports';
import { GLOBAL_SERVICE_TAGS, GLOBAL_TERRACE_TAGS, SERVICE_TAGS_BY_TYPE, TERRACE_TAGS_BY_TYPE } from '../../../assets/tags';
import { ServiceModel as ReserveServiceModel } from '../../../models/ms_reserve/ServiceModel';
import { TerraceModel as ReserveTerraceModel } from '../../../models/ms_reserve/TerraceModel';
import { ServiceModel as TemplateServiceModel } from '../../../models/ms_template/service-model';
import { TerraceModel as TemplateTerraceModel } from '../../../models/ms_template/terrace';
import { ServiceService as ReserveServiceService } from '../../../shared/ms_reserve/serviceService.service';
import { TerraceService as ReserveTerraceService } from '../../../shared/ms_reserve/terraceService.service';
import { ServiceService as TemplateServiceService } from '../../../shared/ms_template/serviceService.service';
import { TerraceService as TemplateTerraceService } from '../../../shared/ms_template/terraceService.service';

type ItemKind = 'servicio' | 'terraza';

interface CombinedService {
  reserve: ReserveServiceModel;
  template: TemplateServiceModel;
  fecha: Date;
  imagen: string;
  tags: string[];
}

interface CombinedTerrace {
  reserve: ReserveTerraceModel;
  template: TemplateTerraceModel;
  fecha: Date;
  imagen: string;
  tags: string[];
}

interface ViewCard {
  id: number;
  tipo: ItemKind;
  nombre: string;
  descripcion: string;
  imagen: string;
  capacidadBase?: number;
  capacidadMaxima?: number;
  precioBase: number;
  ubicacion?: string;
  direccion?: string;
  lugar?: string;
  ciudad?: string;
  tipoEtiqueta?: string;
  tags: string[];
  idUser?: number;
  fechaCreacion: Date;
}

interface StoredData {
  services: { reserve: ReserveServiceModel; template: TemplateServiceModel; fecha: string; imagen: string; tags: string[] }[];
  terraces: { reserve: ReserveTerraceModel; template: TemplateTerraceModel; fecha: string; imagen: string; tags: string[] }[];
}

@Component({
  selector: 'app-mi-host',
  standalone: true,
  imports: [CommonModule, FormsModule, ImportsModule],
  templateUrl: './mi-host.component.html',
  styleUrls: ['./mi-host.component.css']
})
export class MiHostComponent implements OnInit {
  mostrarModal = false;
  tipoSeleccionado: ItemKind | null = null;

  private readonly draftKey = 'miHostFormDraft';

  private servicesCombined: CombinedService[] = [];
  private terracesCombined: CombinedTerrace[] = [];

  formulario: Partial<ViewCard> & { tipoServicio?: string; tipoTerraza?: string } = {};
  imagenPreview: string | null = null;

  constructor(
    private reserveServiceService: ReserveServiceService,
    private reserveTerraceService: ReserveTerraceService,
    private templateServiceService: TemplateServiceService,
    private templateTerraceService: TemplateTerraceService
  ) {
      this.cargarDatos();
  }

  get cards(): ViewCard[] {
    const serviceCards = this.servicesCombined.map((s) => this.toViewCardFromService(s));
    const terraceCards = this.terracesCombined.map((t) => this.toViewCardFromTerrace(t));
    return [...serviceCards, ...terraceCards].sort((a, b) => b.fechaCreacion.getTime() - a.fechaCreacion.getTime());
  }

  get serviceTypeOptions(): { label: string; value: string }[] {
    return this.getDistinctServiceKinds().map((kind) => ({ label: kind, value: kind }));
  }

  get terraceTypeOptions(): { label: string; value: string }[] {
    return this.getDistinctTerraceKinds().map((kind) => ({ label: kind, value: kind }));
  }

  get cityOptions(): { label: string; value: string }[] {
    return this.getDistinctCities().map((city) => ({ label: city, value: city }));
  }

  ngOnInit(): void {
  }

  cargarDatos(): void {
    const datosGuardados = localStorage.getItem('miHostData');
    if (datosGuardados) {
      const parsed: StoredData = JSON.parse(datosGuardados);
      this.servicesCombined = (parsed.services || []).map((s) => ({
        reserve: s.reserve,
        template: s.template,
        fecha: new Date(s.fecha),
        imagen: s.imagen,
        tags: s.tags || []
      }));
      this.terracesCombined = (parsed.terraces || []).map((t) => ({
        reserve: t.reserve,
        template: t.template,
        fecha: new Date(t.fecha),
        imagen: t.imagen,
        tags: t.tags || []
      }));
    }

    forkJoin({
      reserveServices: this.reserveServiceService.getAll(),
      templateServices: this.templateServiceService.getAll(),
      reserveTerraces: this.reserveTerraceService.getAll(),
      templateTerraces: this.templateTerraceService.getAll()
    }).subscribe(({ reserveServices, templateServices, reserveTerraces, templateTerraces }) => {
      this.servicesCombined = this.joinServices(reserveServices, templateServices);
      this.terracesCombined = this.joinTerraces(reserveTerraces, templateTerraces);
      this.guardarEnLocalStorage();
    });
  }

  abrirModal(): void {
    this.mostrarModal = true;
    this.tipoSeleccionado = null;
    this.resetFormulario(false);
    this.cargarBorrador();
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.tipoSeleccionado = null;
    this.resetFormulario();
  }

  seleccionarTipo(tipo: ItemKind): void {
    this.tipoSeleccionado = tipo;
    this.formulario.tipo = tipo;
    this.onFormChange();
  }

  onImagenSeleccionada(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result as string;
      this.imagenPreview = result;
      this.formulario.imagen = result;
      this.onFormChange();
    };
    reader.readAsDataURL(file);
  }

  guardarRegistro(): void {
    if (!this.validarFormulario() || !this.tipoSeleccionado) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    const id = this.formulario.id ?? Date.now();
    const fecha = this.formulario.fechaCreacion ?? new Date();
    const imagen = this.formulario.imagen || this.obtenerImagenPorDefecto();

    if (this.tipoSeleccionado === 'servicio') {
      const combined = this.crearServicioDesdeFormulario(id, fecha, imagen);
      const idx = this.servicesCombined.findIndex((s) => s.reserve.id === id);
      if (idx >= 0) {
        this.servicesCombined[idx] = combined;
      } else {
        this.servicesCombined.unshift(combined);
      }
    } else {
      const combined = this.crearTerrazaDesdeFormulario(id, fecha, imagen);
      const idx = this.terracesCombined.findIndex((t) => t.reserve.id === id);
      if (idx >= 0) {
        this.terracesCombined[idx] = combined;
      } else {
        this.terracesCombined.unshift(combined);
      }
    }

    this.guardarEnLocalStorage();
    this.cerrarModal();
    this.limpiarBorrador();
    alert(`${this.tipoSeleccionado === 'servicio' ? 'Servicio' : 'Terraza'} registrado exitosamente!`);
  }

  validarFormulario(): boolean {
    if (!this.formulario.nombre || !this.formulario.descripcion || !this.formulario.precioBase) {
      return false;
    }

    if (this.tipoSeleccionado === 'terraza') {
      return !!(
        this.formulario.ubicacion &&
        this.formulario.direccion &&
        this.formulario.lugar &&
        this.formulario.ciudad &&
        (this.formulario.tipoTerraza || this.formulario.tipoEtiqueta)
      );
    }

    return true;
  }

  obtenerImagenPorDefecto(): string {
    return this.tipoSeleccionado === 'terraza'
      ? 'https://images.unsplash.com/photo-1519167758481-83f29da8ae8d?w=800'
      : 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800';
  }

  resetFormulario(clearDraft: boolean = true): void {
    this.formulario = {};
    this.imagenPreview = null;
    if (clearDraft) {
      this.limpiarBorrador();
    }
  }

  onFormChange(): void {
    const payload = {
      formulario: this.formulario,
      tipoSeleccionado: this.tipoSeleccionado,
      imagenPreview: this.imagenPreview
    };
    localStorage.setItem(this.draftKey, JSON.stringify(payload));
  }

  private cargarBorrador(): void {
    const draft = localStorage.getItem(this.draftKey);
    if (!draft) {
      return;
    }
    try {
      const parsed = JSON.parse(draft);
      this.formulario = parsed.formulario || {};
      this.tipoSeleccionado = parsed.tipoSeleccionado || null;
      this.imagenPreview = parsed.imagenPreview || null;
    } catch (error) {
      console.warn('No se pudo cargar el borrador del formulario', error);
    }
  }

  private limpiarBorrador(): void {
    localStorage.removeItem(this.draftKey);
  }

  guardarEnLocalStorage(): void {
    const payload: StoredData = {
      services: this.servicesCombined.map((s) => ({
        reserve: s.reserve,
        template: s.template,
        fecha: s.fecha.toISOString(),
        imagen: s.imagen,
        tags: s.tags
      })),
      terraces: this.terracesCombined.map((t) => ({
        reserve: t.reserve,
        template: t.template,
        fecha: t.fecha.toISOString(),
        imagen: t.imagen,
        tags: t.tags
      }))
    };
    localStorage.setItem('miHostData', JSON.stringify(payload));
  }

  // aca guardaremos en la base de datos en el futuro

  editarRegistro(card: ViewCard): void {
    this.formulario = { ...card };
    this.tipoSeleccionado = card.tipo;
    this.imagenPreview = card.imagen || null;
    this.mostrarModal = true;
  }

  eliminarRegistro(id: number): void {
    if (!confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      return;
    }

    this.servicesCombined = this.servicesCombined.filter((s) => s.reserve.id !== id);
    this.terracesCombined = this.terracesCombined.filter((t) => t.reserve.id !== id);
    this.guardarEnLocalStorage();
  }

  obtenerIconoTipo(tipo: ItemKind): string {
    return tipo === 'terraza' ? '🏛️' : '🎉';
  }

  filtrarPorTipo(tipo: ItemKind | 'todos'): ViewCard[] {
    if (tipo === 'todos') {
      return this.cards;
    }
    return this.cards.filter((c) => c.tipo === tipo);
  }

  private joinServices(reserve: ReserveServiceModel[], template: TemplateServiceModel[]): CombinedService[] {
    return template
      .map((t) => {
        const r = reserve.find((rItem) => rItem.id === t.id);
        if (!r) {
          return null;
        }
        const imagen = this.obtenerPrimeraImagen((t as any).url_Img || (t as any).URL_Img) || this.obtenerImagenPorDefecto();
        const tags = t.tags && t.tags.length > 0 ? t.tags : this.buildServiceTags(t.serviceType?.[0]?.kind);
        return { reserve: r, template: t, fecha: new Date(), imagen, tags } as CombinedService;
      })
      .filter((c): c is CombinedService => !!c);
  }

  private joinTerraces(reserve: ReserveTerraceModel[], template: TemplateTerraceModel[]): CombinedTerrace[] {
    return template
      .map((t) => {
        const r = reserve.find((rItem) => rItem.id === t.id);
        if (!r) {
          return null;
        }
        const imagen = this.obtenerPrimeraImagen((t as any).url_Img || (t as any).URL_Img) || this.obtenerImagenPorDefecto();
        const tags = t.tags && t.tags.length > 0 ? t.tags : this.buildTerraceTags(t.terraceType?.[0]?.kind);
        return { reserve: r, template: t, fecha: new Date(), imagen, tags } as CombinedTerrace;
      })
      .filter((c): c is CombinedTerrace => !!c);
  }

  private crearServicioDesdeFormulario(id: number, fecha: Date, imagen: string): CombinedService {
    const price = this.formulario.precioBase ?? 0;
    const baseSize = this.formulario.capacidadBase ?? 0;
    const maxSize = this.formulario.capacidadMaxima ?? baseSize;
    const serviceKind = this.formulario.tipoServicio || 'Alimentos y Bebidas';
    const city = this.formulario.ciudad || 'Guadalajara';

    const template: TemplateServiceModel = {
      id,
      serviceType: [this.ensureServiceType(serviceKind)],
      cityModel: [this.ensureCity(city)],
      idServiceDB: 0,
      idAsociateDB: 0,
      URL_Img: [imagen],
      tags: this.buildServiceTags(serviceKind),
      name: this.formulario.nombre ?? 'Servicio',
      description: this.formulario.descripcion ?? '',
      price
    };

    const reserve: ReserveServiceModel = {
      id,
      name: template.name,
      asociateService: { id: 0, idUser: 1, name: 'Host Asociado', mail: 'host@mail.com', phone: '333-000-0000', killed: 0 },
      basePrice: price,
      priceAdd10: Math.round(price * 1.1),
      baseSize,
      maxSize,
      killed: 0
    };

    return { reserve, template, fecha, imagen, tags: template.tags || [] };
  }

  private crearTerrazaDesdeFormulario(id: number, fecha: Date, imagen: string): CombinedTerrace {
    const price = this.formulario.precioBase ?? 0;
    const baseSize = this.formulario.capacidadBase ?? 0;
    const maxSize = this.formulario.capacidadMaxima ?? baseSize;
    const terraceKind = this.formulario.tipoTerraza || 'Terraza';
    const city = this.formulario.ciudad || 'Guadalajara';

    const template: TemplateTerraceModel = {
      id,
      terraceType: [this.ensureTerraceType(terraceKind)],
      cityModel: this.ensureCity(city),
      idTerraceDB: 0,
      idAsociateDB: 0,
      URL_Img: [imagen],
      tags: this.buildTerraceTags(terraceKind),
      name: this.formulario.nombre ?? 'Terraza',
      description: this.formulario.descripcion ?? '',
      price,
      place: this.formulario.lugar ?? this.formulario.ubicacion ?? ''
    };

    const reserve: ReserveTerraceModel = {
      id,
      name: template.name,
      asociateTerrace: { id: 0, idUser: 1, name: 'Host Asociado', mail: 'host@mail.com', phone: '333-111-1111', killed: 0 },
      baseSize,
      maxSize,
      basePrice: price,
      priceAdd10: Math.round(price * 1.1),
      direction: this.formulario.direccion ?? '',
      killed: 0
    };

    return { reserve, template, fecha, imagen, tags: template.tags || [] };
  }

  private toViewCardFromService(source: CombinedService): ViewCard {
    const ciudad = source.template.cityModel?.[0]?.kind;
    const tipoEtiqueta = source.template.serviceType?.[0]?.kind;
    return {
      id: source.reserve.id,
      tipo: 'servicio',
      nombre: source.template.name,
      descripcion: source.template.description,
      imagen: source.imagen,
      capacidadBase: source.reserve.baseSize,
      capacidadMaxima: source.reserve.maxSize,
      precioBase: source.reserve.basePrice,
      ciudad,
      tipoEtiqueta,
      tags: source.tags,
      idUser: source.reserve.asociateService?.idUser,
      fechaCreacion: source.fecha
    };
  }

  private toViewCardFromTerrace(source: CombinedTerrace): ViewCard {
    const tipoEtiqueta = source.template.terraceType?.[0]?.kind;
    const ciudad = source.template.cityModel?.kind;
    return {
      id: source.reserve.id,
      tipo: 'terraza',
      nombre: source.template.name,
      descripcion: source.template.description,
      imagen: source.imagen,
      capacidadBase: source.reserve.baseSize,
      capacidadMaxima: source.reserve.maxSize,
      precioBase: source.reserve.basePrice,
      ubicacion: source.template.place,
      direccion: source.reserve.direction,
      lugar: source.template.place,
      ciudad,
      tipoEtiqueta,
      tags: source.tags,
      idUser: source.reserve.asociateTerrace?.idUser,
      fechaCreacion: source.fecha
    };
  }

  private ensureCity(kind: string): CityModel {
    return { id: Date.now(), kind, killed: 0 };
  }

  private ensureServiceType(kind: string): ServiceTypeModel {
    return { id: Date.now(), kind, killed: 0 };
  }

  private ensureTerraceType(kind: string): TerraceTypeModel {
    return { id: Date.now(), kind, killed: 0 };
  }

  private getDistinctServiceKinds(): string[] {
    const fromData = this.servicesCombined
      .map((s) => s.template.serviceType?.[0]?.kind)
      .filter((k): k is string => !!k);
    const fromTags = Object.keys(SERVICE_TAGS_BY_TYPE);
    return Array.from(new Set([...fromData, ...fromTags]));
  }

  private getDistinctTerraceKinds(): string[] {
    const fromData = this.terracesCombined
      .map((t) => t.template.terraceType?.[0]?.kind)
      .filter((k): k is string => !!k);
    const fromTags = Object.keys(TERRACE_TAGS_BY_TYPE);
    return Array.from(new Set([...fromData, ...fromTags]));
  }

  private getDistinctCities(): string[] {
    const fromServices = this.servicesCombined
      .map((s) => s.template.cityModel?.[0]?.kind)
      .filter((c): c is string => !!c);
    const fromTerraces = this.terracesCombined
      .map((t) => t.template.cityModel?.kind)
      .filter((c): c is string => !!c);
    return Array.from(new Set([...fromServices, ...fromTerraces, 'Guadalajara', 'Zapopan']));
  }

  private buildServiceTags(kind?: string): string[] {
    const specific = kind ? SERVICE_TAGS_BY_TYPE[kind] || [] : [];
    const extra = GLOBAL_SERVICE_TAGS.slice(0, 5);
    return Array.from(new Set([...specific, ...extra]));
  }

  private buildTerraceTags(kind?: string): string[] {
    const specific = kind ? TERRACE_TAGS_BY_TYPE[kind] || [] : [];
    const extra = GLOBAL_TERRACE_TAGS.slice(0, 5);
    return Array.from(new Set([...specific, ...extra]));
  }

  private obtenerPrimeraImagen(urls?: (string | undefined)[]): string | undefined {
    if (!urls || urls.length === 0) {
      return undefined;
    }
    return urls.find((u) => !!u);
  }
}