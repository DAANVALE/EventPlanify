import { Component, OnInit, signal, computed, WritableSignal, Signal } from '@angular/core';
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
import { ReserveModel as R_ReserveModel } from '../../../models/ms_reserve/ReserveModel';

import { TerraceService as R_TerraceService } from '../../../shared/ms_reserve/terraceService.service';
import { ServiceService as R_ServiceService } from '../../../shared/ms_reserve/serviceService.service';
// Test Data
import { templateModelTs } from '../../../assets/template-test-data';
import { DeferBlockBehavior } from '@angular/core/testing';

@Component({
  selector: 'app-template-canva',
  standalone: true,
  imports: [ImportsModule, CommonModule, FormsModule, TemplateFindtemplateComponent, TemplateSelectedTemplateComponent],
  templateUrl: './template-canva.component.html',
  styleUrl: './template-canva.component.css'
})
export class TemplateCanvaComponent implements OnInit {

  // Signals
  template = signal<T_TemplateModel>({} as T_TemplateModel);
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
  ) {

    if(this.template === null || this.template().id === undefined){
      this.template.set(templateModelTs[0]);
    }
  }

  ngOnInit(): void {
    this.initializeData();
    this.loadReservesFromLocal();
  }

  // ========== DATA LOADING METHODS ==========
  private initializeData(): void {
    // this.loadServices();
    this.loadTerraces();
    this.loadTerraceType();
    this.loadServiceType();
  }

  loadServiceType(): void {
    this.t_serviceTypeService.getAll().subscribe({
      next: (data) => {
        this.serviceTypes.set(data)
        this.template().serviceTypeModel.forEach(element => {
          this.loadServicesByType(element.id);
        });
      },
      error: (error) => console.error("Error loading service types:", error),
    });
  }

  loadTerraceType(): void {
    this.t_terraceTypeService.getAll().subscribe({
      next: (data) => {
        this.terraceTypes.set(data);
      },
      error: (error) => console.error("Error loading terrace types:", error),
    });
  }

  grouped: { [key: number]: T_ServiceModel[] } = {};

  loadServicesByType(serviceTypeId: number): void {
    this.t_serviceService.getByServiceType(serviceTypeId).subscribe({
      next: (data) => this.grouped[serviceTypeId] = data,
      error: (error) => console.error("Error loading services by type:", error),
    });
  }

  loadServices(): void {
    this.t_serviceService.getAll().subscribe({
      next: (data) => {
        this.services.set(data);
        this.template().serviceTypeModel.forEach(element => {
          this.loadServicesByType(element.id);
        });
      },
      error: (error) => console.error("Error loading services:", error),
    });
  }

  loadTerraces(): void {

    const id = this.template().terraceTypeModel.id;

    this.t_terraceService.getByTerraceTypeId(id).subscribe({
      next: (data) => this.terraces.set(data),
      error: (error) => console.error("Error loading terraces by type:", error),
    });
  }

  // ========== SERVICE TYPE METHODS ==========
  onSelectServiceType(): void {
    if (!this.selectedServiceType) return;

    this.template.set({
      ...this.template(),
      serviceTypeModel: [...this.template().serviceTypeModel, this.selectedServiceType]
    });
    console.warn("🙅🙅🙅 serviceType selected");

    this.loadServicesByType(this.selectedServiceType.id);
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
    console.log('Getting services for ServiceType:', serviceType);
    console.log(this.grouped);

    if (!serviceType) return [];
    return this.grouped[serviceType.id];
  }

  openServiceDialog(service: T_ServiceModel): void {
    this.selectedService_T = { ...service };

    this.r_serviceService.getById(service.idServiceDB).subscribe({
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
        this.selectedServices = reservesData || [];
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
    this.saveCurrentSelections();
    this.router.navigate(['/confirmation']);
  }

  saveCurrentSelections(): void {
    this.loadEventFromLocal();
    this.loadReservesFromLocal();

    const reservationEvent : Partial<R_EventModel> = {
      terraceModel: this.eventModel.terraceModel
    };

    const reserveServices: R_ServiceModel[] = [];

    for (let service of this.selectedServices)
    {
      this.r_serviceService.getById(service.idServiceDB).subscribe({
        next: (data) => {
          reserveServices.push(data);
        }, 
        error: (error) => console.error("Error", error)
      });
    }

    const reserveReserves: Partial<R_ReserveModel>[] = reserveServices.map(service => ({
      serviceModel: service,
    }));

    const tuple = { reserveServices, reserveReserves };

    localStorage.setItem('pendingEventReservation', JSON.stringify(reservationEvent));
    localStorage.setItem('pendingServiceReservations', JSON.stringify(tuple));
    // localStorage.setItem('pendingServiceReservations', JSON.stringify(reserveServices));
  }

  // Métodos auxiliares (los que ya tenías)
  hasSelections(): boolean {
    return !!this.eventModel.terraceModel || 
           (this.selectedServices && this.selectedServices.length > 0);
  }

  responsiveOptions = [
    { breakpoint: '1400px', numVisible: 4, numScroll: 1 },
    { breakpoint: '1100px', numVisible: 3, numScroll: 1 },
    { breakpoint: '768px', numVisible: 2, numScroll: 1 },
    { breakpoint: '560px',numVisible: 1, numScroll: 1 }
  ];
}