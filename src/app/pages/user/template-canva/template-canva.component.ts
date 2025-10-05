import { Component, OnInit, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImportsModule } from '../../../imports';

// Components
import { TemplateFindtemplateComponent } from './template-findtemplate/template-findtemplate.component';
import { TemplateSelectedTemplateComponent } from './template-selectedtemplate/template-selectedtemplate.component';

// Template Models & Services
import { TemplateModel as T_TemplateModel } from '../../../models/ms_template/template';
import { ServiceModel as T_ServiceModel } from '../../../models/ms_template/service-model';
import { ServiceTypeModel as T_ServiceTypeModel } from '../../../models/ms_template/service-type';
import { TerraceTypeModel as T_TerraceTypeModel } from '../../../models/ms_template/terrace-type';
import { TerraceModel as T_TerraceModel } from '../../../models/ms_template/terrace';

import { TerraceService as T_TerraceService } from '../../../shared/ms_template/terraceService.service';
import { TemplateService as T_TemplateService } from '../../../shared/ms_template/templateService.service';
import { ServiceService as T_ServiceService } from '../../../shared/ms_template/serviceService.service';
import { ServiceTypeService as T_ServiceTypeService } from '../../../shared/ms_template/serviceTypeService.service';
import { TerraceTypeService as T_TerraceTypeService } from '../../../shared/ms_template/terraceTypeService.service';

// Reserve Models & Services
import { EventModel as R_EventModel } from '../../../models/ms_reserve/EventModel';
import { TerraceModel as R_TerraceModel } from '../../../models/ms_reserve/TerraceModel';
import { ServiceModel as R_ServiceModel } from '../../../models/ms_reserve/ServiceModel';

import { TerraceService as R_TerraceService } from '../../../shared/ms_reserve/terraceService.service';
import { ServiceService as R_ServiceService } from '../../../shared/ms_reserve/serviceService.service';
// Test Data
import { templateModelTs } from '../../../assets/template-test-data';

@Component({
  selector: 'app-template-canva',
  standalone: true,
  imports: [ImportsModule, CommonModule, FormsModule, TemplateFindtemplateComponent, TemplateSelectedTemplateComponent],
  templateUrl: './template-canva.component.html',
  styleUrl: './template-canva.component.css'
})
export class TemplateCanvaComponent implements OnInit {

  // Signals
  template = signal<T_TemplateModel>(templateModelTs[3]);
  serviceTypes = signal<T_ServiceTypeModel[]>([]);
  terraceTypes = signal<T_TerraceTypeModel[]>([]);
  services = signal<T_ServiceModel[]>([]);
  terraces = signal<T_TerraceModel[]>([]);
  r_terrace = signal<R_TerraceModel | null>(null);
  r_service = signal<R_ServiceModel | null>(null);

  // Selected items
  selectedServiceType: T_ServiceTypeModel | null = null;
  selectedTerraceType: T_TerraceTypeModel | null = null;
  selectedService_R: R_ServiceModel | null = null;
  selectedService_T: T_ServiceModel | null = null;
  selectedServices: T_ServiceModel[] = [];

  // State
  eventModel: Partial<R_EventModel> = {};
  showDialog = false;
  showServiceDialog = false;

  constructor(
    private t_templateService: T_TemplateService,
    private t_serviceService: T_ServiceService,
    private t_serviceTypeService: T_ServiceTypeService,
    private t_terraceTypeService: T_TerraceTypeService,
    private t_terraceService: T_TerraceService,
    private r_terraceService: R_TerraceService,
    private r_serviceService: R_ServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeData();
    this.loadReservesFromLocal();
  }

  // ========== DATA LOADING METHODS ==========
  private initializeData(): void {
    this.loadServices();
    this.loadTerraces();
    this.loadTerraceType();
    this.loadServiceType();
  }

  loadServiceType(): void {
    this.t_serviceTypeService.getAll().subscribe({
      next: (data) => this.serviceTypes.set(data),
      error: (error) => console.error("Error loading service types:", error),
    });
  }

  loadTerraceType(): void {
    this.t_terraceTypeService.getAll().subscribe({
      next: (data) => this.terraceTypes.set(data),
      error: (error) => console.error("Error loading terrace types:", error),
    });
  }

  loadServices(): void {
    this.t_serviceService.getAll().subscribe({
      next: (data) => this.services.set(data),
      error: (error) => console.error("Error loading services:", error),
    });
  }

  loadTerraces(): void {
    this.t_terraceService.getAll().subscribe({
      next: (data) => this.terraces.set(data),
      error: (error) => console.error("Error loading terraces:", error),
    });
  }

  // ========== SERVICE TYPE METHODS ==========
  onSelectServiceType(): void {
    if (!this.selectedServiceType) return;

    this.template.set({
      ...this.template(),
      serviceTypeModel: [...this.template().serviceTypeModel, this.selectedServiceType]
    });

    this.selectedServiceType = null;
  }

  removeServiceType(typeToRemove: T_ServiceTypeModel): void {
    const updatedTypes = this.template().serviceTypeModel.filter(
      type => type.id !== typeToRemove.id
    );
    this.template.set({ ...this.template(), serviceTypeModel: updatedTypes });

    this.selectedServices = this.selectedServices.filter(service =>
      !service.serviceType.some(type => type.id === typeToRemove.id)
    );

    this.updateEventModel_ServicesSelected();
  }

  // ========== TERRACE TYPE METHODS ==========
  onSelectTerraceType(): void {
    if (!this.selectedTerraceType) return;

    this.template.set({
      ...this.template(),
      terraceTypeModel: this.selectedTerraceType
    });

    this.selectedTerraceType = null;
  }

    // ========== SERVICE SELECTION METHODS ==========
getServicesByType(serviceType: T_ServiceTypeModel): T_ServiceModel[] {
  if (!serviceType || !this.services()) return [];
  
  return this.services().filter(service => 
    service.serviceType.some(element => element.id === serviceType.id)
  );
}

  openServiceDialog(service: T_ServiceModel): void {
    this.selectedService_T = { ...service };

    this.r_serviceService.getById(service.id).subscribe({
      next: (data: R_ServiceModel) => {
        this.selectedService_R = data;
        this.showServiceDialog = true;
      },
      error: () => console.error("Error loading service details:"),
    });
  }

  selectService(templateService: T_ServiceModel, reserveService: R_ServiceModel): void {
    const index = this.selectedServices.findIndex(s => s.id === templateService.id);
    
    if (index > -1) {
      this.selectedServices.splice(index, 1);
    } else {
      this.selectedServices.push(templateService);
    }

    this.updateEventModel_ServicesSelected();
    this.showServiceDialog = false;
  }

  isServiceSelected(service: T_ServiceModel): boolean {
    return this.selectedServices.some(s => s.id === service.id);
  }

  // ========== LOCAL STORAGE METHODS ==========
  updateEventModel_ServicesSelected(): void {
    localStorage.setItem('serviceReserves', JSON.stringify(this.selectedServices));
  }

  loadReservesFromLocal(): void {
    const stored = localStorage.getItem('serviceReserves');
    if (stored) {
      try {
        const reservesData = JSON.parse(stored);
        this.selectedServices = reservesData.reserves || [];
      } catch (error) {
        console.error('Error loading reserves from localStorage:', error);
        this.selectedServices = [];
      }
    }
  }

  clearReserves(): void {
    this.selectedServices = [];
    localStorage.removeItem('serviceReserves');
  }

  // ========== TERRACE METHODS ==========
  onTerraceSelected(terraceModel: R_TerraceModel): void {
    this.eventModel.terraceModel = terraceModel;
    this.saveEventModelToLocal();
  }

  onTemplateSelected(template: T_TemplateModel): void {
    this.template.set(template);
  }

  saveEventModelToLocal(): void {
    localStorage.setItem('event', JSON.stringify(this.eventModel));
  }

  loadEventFromLocal(): void {
    const data = localStorage.getItem('event');
    if (data) {
      this.eventModel = JSON.parse(data);
    }
  }

  savedTerrace(): boolean {
    this.loadEventFromLocal();
    return !!this.eventModel.terraceModel;
  }

  clearTerrace(): void {
    this.eventModel.terraceModel = undefined;
    localStorage.setItem('event', '');
    this.saveEventModelToLocal();
  }

  // ========== UTILITY METHODS ==========
  onImageError(event: any): void {
    event.target.src = '../../../assets/calendars.png';
  }

  goToConfirmation(): void {
    console.log('📍 Intentando navegar a confirmation...');
    
    // Guardar datos
    this.saveCurrentSelections();
    
    // Verificar que el router esté inyectado
    console.log('Router:', this.router);
    
    // Probar diferentes métodos de navegación:
    
    // Método 1: navigate
    this.router.navigate(['/confirmation']).then(success => {
      console.log('Navegación exitosa:', success);
    }).catch(error => {
      console.error('Error en navegación:', error);
    });
    
    // Método 2: O prueba con navigateByUrl después de un delay
    // setTimeout(() => {
    //   this.router.navigateByUrl('/confirmation');
    // }, 100);
  }

  saveCurrentSelections(): void {
    const reservationData = {
      terrace: this.eventModel.terraceModel,
      services: this.selectedServices,
      total: this.calculateTotal(),
      savedAt: new Date().toISOString()
    };
    
    localStorage.setItem('pendingReservation', JSON.stringify(reservationData));
  }

  // Métodos auxiliares (los que ya tenías)
  hasSelections(): boolean {
    return !!this.eventModel.terraceModel || 
           (this.selectedServices && this.selectedServices.length > 0);
  }

  getTotalItems(): number {
    let count = 0;
    if (this.eventModel.terraceModel) count++;
    if (this.selectedServices) count += this.selectedServices.length;
    return count;
  }

  calculateTotal(): number {
    let total = 0;
    
    if (this.eventModel.terraceModel?.priceAdd10) {
      total += this.eventModel.terraceModel.priceAdd10;
    }
    
    if (this.selectedServices) {
      this.selectedServices.forEach(service => {
        total += service?.price || 0;
      });
    }
    
    return total;
  }

  responsiveOptions = [
    { breakpoint: '1400px', numVisible: 4, numScroll: 1 },
    { breakpoint: '1100px', numVisible: 3, numScroll: 1 },
    { breakpoint: '768px', numVisible: 2, numScroll: 1 },
    { breakpoint: '560px',numVisible: 1, numScroll: 1 }
  ];
}