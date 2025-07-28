import { TerraceService } from './../../../shared/ms_reserve/terraceService.service';
import { TemplateFindtemplateComponent } from './template-findtemplate/template-findtemplate.component';
import { terraceModelTs } from './../../../assets/test-data';
import { ClientModel } from './../../../models/ms_reserve/ClientModel';
import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ImportsModule } from '../../../imports';


// * NOTE: MS template Models & Services
import { TemplateModel as T_TemplateModel } from '../../../models/ms_template/template';
import { ServiceModel as T_ServiceModel } from './../../../models/ms_template/service-model';
import { ServiceTypeModel as T_ServiceTypeModel } from '../../../models/ms_template/service-type';
import { TerraceTypeModel as T_TerraceTypeModel } from '../../../models/ms_template/terrace-type';
import { TerraceModel as T_TerraceModel} from '../../../models/ms_template/terrace';

import { TerraceService as T_TerraceService } from '../../../shared/ms_template/terraceService.service';
import { TemplateService as T_TemplateService } from '../../../shared/ms_template/templateService.service';
import { ServiceService as T_ServiceService } from '../../../shared/ms_template/serviceService.service';
import { ServiceTypeService as T_ServiceTypeService } from '../../../shared/ms_template/serviceTypeService.service';
import { TerraceTypeService as T_TerraceTypeService } from '../../../shared/ms_template/terraceTypeService.service';

// *? HACK: MS template test-data
import { templateModelTs, serviceModelTs } from '../../../assets/test-data';

// * NOTE: MS reserve Model & Services
import { EventModel as R_EventModel } from './../../../models/ms_reserve/EventModel';
import { TerraceModel as R_TerraceModel } from '../../../models/ms_reserve/TerraceModel';

import { TerraceService as R_TerraceService } from '../../../shared/ms_reserve/terraceService.service';
@Component({
  selector: 'app-template-canva',
  standalone: true,
  imports: [ImportsModule, CommonModule, FormsModule, TemplateFindtemplateComponent],
  templateUrl: './template-canva.component.html',
  styleUrl: './template-canva.component.css'
})
export class TemplateCanvaComponent implements OnInit {

  template     = signal<T_TemplateModel>(templateModelTs[3]);

  serviceTypes = signal<T_ServiceTypeModel[]>([]);
  terraceTypes = signal<T_TerraceTypeModel[]>([]);
  services     = signal<T_ServiceModel[]>([]);

  terraces = signal<T_TerraceModel[]>([]);

  selectedServiceType: T_ServiceTypeModel | null = null;;
  selectedTerraceType: T_TerraceTypeModel | null = null;;

  eventModel: Partial<R_EventModel> = {};

  constructor(
    private t_templateService: T_TemplateService,
    private t_serviceService: T_ServiceService,
    private t_serviceTypeService: T_ServiceTypeService,
    private t_terraceTypeService: T_TerraceTypeService,
    private t_terraceService: T_TerraceService,

    private r_terraceService: R_TerraceService,
  ) {}

  ngOnInit(): void {
    this.loadServices();
    this.loadTerraces();

    this.loadTerraceType();
    this.loadServiceType();
  }

  loadServiceType(): void{
    this.t_serviceTypeService.getAll().subscribe({
      next: (data) => this.serviceTypes.set(data),
      error: (error) => console.error("Error", error),
    })
  }

  loadTerraceType(): void{
    this.t_terraceTypeService.getAll().subscribe({
      next: (data) => this.terraceTypes.set(data),
      error: (error) => console.error("Error", error),
    })
  }

  loadServices(): void{
    this.t_serviceService.getAll().subscribe({
      next: (data) => this.services.set(data),
      error: (error) => console.error("Error", error),
    })
  }

  loadTerraces(): void{
    this.t_terraceService.getAll().subscribe({
      next: (data) => this.terraces.set(data),
      error: (error) => console.error("Error", error),
    })
  }

  loadServicesByServiceType(typeService: T_ServiceTypeModel): void{
    this.t_serviceService.getAll().subscribe({
      next: (data) => this.services.set(data),
      error: (error) => console.error("Error", error),
    })
  }

  onSelectServiceType(){
    if (this.selectedServiceType == null ) return;

    this.template.set({
      ...this.template(),
      serviceTypeModel: [...this.template()!.serviceTypeModel, this.selectedServiceType]
    });

    this.selectedServiceType = null;
  }

  onSelectTerraceType(){
    if(this.selectedTerraceType == null){
      return
    }

    this.template.set({
      ...this.template(),
      terraceTypeModel: this.selectedTerraceType
    });

    this.selectedTerraceType = null;
  }

  removeServiceType(typeToRemove: T_ServiceTypeModel): void {
    this.template().serviceTypeModel = this.template().serviceTypeModel.filter(
      type => type.id !== typeToRemove.id
    );
  }

  onTerraceSelected(r_terraceModel: R_TerraceModel): void{
    this.eventModel.terraceModel = r_terraceModel;
    this.saveEventModelToLocal();
  }

  saveEventModelToLocal(): void{
    localStorage.setItem('event', JSON.stringify(this.eventModel) )
  }

  loadEventFromLocal(): void{

    const data = localStorage.getItem('event');

    if(data){
      this.eventModel = JSON.parse(data);
    }

  }

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];
}
