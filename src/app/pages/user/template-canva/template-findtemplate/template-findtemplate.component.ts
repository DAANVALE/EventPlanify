import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ImportsModule } from '../../../../imports';
import { CommonModule } from '@angular/common';

import { TerraceModel as R_TerraceModel} from '../../../../models/ms_reserve/TerraceModel';

import { TemplateModel as T_TemplateModel} from '../../../../models/ms_template/template';
import { TerraceTypeModel as T_TerraceTypeModel} from '../../../../models/ms_template/terrace-type';
import { TerraceModel as T_TerraceModel, TerraceModel } from '../../../../models/ms_template/terrace';
import { FormsModule } from '@angular/forms';

import { TerraceService as R_TerraceService} from '../../../../shared/ms_reserve/terraceService.service';
import { EventModel } from '../../../../models/ms_reserve/EventModel';

@Component({
  selector: 'app-template-findtemplate',
  standalone: true,
  imports: [ImportsModule, CommonModule, FormsModule],
  templateUrl: './template-findtemplate.component.html',
  styleUrl: './template-findtemplate.component.css'
})
export class TemplateFindtemplateComponent {
  @Input() terraceTypes: T_TerraceTypeModel[] = [];
  @Input() terraces: T_TerraceModel[] = [];

  @Input() template!: T_TemplateModel;

  @Output() terraceRSelected = new EventEmitter<R_TerraceModel>();
  @Output() templateTSelected = new EventEmitter<T_TemplateModel>();

  selectedTerraceType: R_TerraceModel | null = null;

  showDialog: boolean = false;

  selectedTTerrace: any = null;
  selectedRTerrace: any = null;

  r_terrace = signal<R_TerraceModel | null>(null);
  eventModel: Partial<EventModel> = {};

  constructor(
    private r_terraceService: R_TerraceService
  ) { }

  onSelectTerraceType() {
    if (this.selectedTerraceType) {
      this.terraceRSelected.emit(this.selectedTerraceType);
    }
  }

  openDialog(terrace: any): void {
    this.selectedTTerrace = { ...terrace };

    this.r_terraceService.getById(terrace.idTerrace_DB).subscribe({
      next: (data) => {
        this.r_terrace.set(data);
        this.selectedRTerrace = { ...this.r_terrace() }; // copia para editar
        this.showDialog = true;
      },
      error: (error) => console.error("Error", error),
    });
  }

  saveChanges(): void {
    this.eventModel.terraceModel = this.selectedRTerrace;
    this.saveEventModelToLocal();
    this.terraceRSelected.emit(this.selectedRTerrace);
    this.showDialog = false;
  }

  saveEventModelToLocal(): void{
    localStorage.setItem('event', JSON.stringify(this.eventModel) )
    // localStorage.setItem('terrace', JSON.stringify(this.selectedTTerrace))
  }

  onImageError(event: any) {
    event.target.src = '../../../assets/calendars.png';
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
