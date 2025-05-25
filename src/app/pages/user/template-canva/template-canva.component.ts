import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ImportsModule } from '../../../imports';

import { TemplateModel } from '../../../models/ms_template/template';
import { TemplateService } from '../../../shared/ms_template/templateService.service';
import { ServiceModel } from './../../../models/ms_template/service-model';
import { ServiceService } from '../../../shared/ms_template/serviceService.service';

import { ServiceTypeModel } from '../../../models/ms_template/service-type';
import { ServiceTypeService } from '../../../shared/ms_template/serviceTypeService.service';

import { templateModelTs, serviceModelTs } from '../../../assets/test-data';

import { TerraceTypeService } from '../../../shared/ms_template/terraceTypeService.service';
import { TerraceTypeModel } from '../../../models/ms_template/terraceType';

@Component({
  selector: 'app-template-canva',
  standalone: true,
  imports: [ImportsModule, CommonModule, FormsModule],
  templateUrl: './template-canva.component.html',
  styleUrl: './template-canva.component.css'
})
export class TemplateCanvaComponent implements OnInit {

  template     = signal<TemplateModel>(templateModelTs[3]);

  serviceTypes = signal<ServiceTypeModel[]>([]);
  terraceTypes = signal<TerraceTypeModel[]>([]);

  services     = signal<ServiceModel[]>([]);

  selectedServiceType: ServiceTypeModel | null = null;;
  selectedTerraceType: TerraceTypeModel | null = null;;

  constructor(
    private templateService: TemplateService,
    private serviceService: ServiceService,
    private serviceTypeService: ServiceTypeService,
    private terraceTypeService: TerraceTypeService
  ) {}

  ngOnInit(): void {
    this.loadServices();
    this.loadTerraceType();
    this.loadServiceType(); // <--- esto faltaba
  }

  loadServiceType(): void{
    this.serviceTypeService.getAll().subscribe({
      next: (data) => this.serviceTypes.set(data),
      error: (error) => console.error("Error", error),
    })
  }

  loadTerraceType(): void{
    this.terraceTypeService.getAll().subscribe({
      next: (data) => this.terraceTypes.set(data),
      error: (error) => console.error("Error", error),
    })
  }

  loadServices(): void{
    this.serviceService.getAll().subscribe({
      next: (data) => this.services.set(data),
      error: (error) => console.error("Error", error),
    })
  }

  loadServicesByService(typeService: ServiceTypeModel): void{
    this.serviceService.getAll().subscribe({
      next: (data) => this.services.set(data),
      error: (error) => console.error("Error", error),
    })
  }

  onSelectServiceType(){
    if(this.selectedServiceType == null){
      return
    }

    this.template().serviceTypeModel.push(this.selectedServiceType!);
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
