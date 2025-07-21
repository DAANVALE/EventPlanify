import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImportsModule } from '../../../../imports';
import { CommonModule } from '@angular/common';

import { TerraceModel as R_TerraceModel} from '../../../../models/ms_reserve/TerraceModel';

import { TemplateModel as T_TemplateModel} from '../../../../models/ms_template/template';
import { TerraceTypeModel as T_TerraceTypeModel} from '../../../../models/ms_template/terrace-type';
import { TerraceModel as T_TerraceModel } from '../../../../models/ms_template/terrace';

@Component({
  selector: 'app-template-findtemplate',
  standalone: true,
  imports: [ImportsModule, CommonModule],
  templateUrl: './template-findtemplate.component.html',
  styleUrl: './template-findtemplate.component.css'
})
export class TemplateFindtemplateComponent {
  @Input() terraceTypes: T_TerraceTypeModel[] = [];
  @Input() terrace: T_TerraceModel[] = [];

  @Input() template!: T_TemplateModel;

  @Output() terraceSelected = new EventEmitter<R_TerraceModel>();
  @Output() templateSelected = new EventEmitter<T_TemplateModel>();

  selectedTerraceType: R_TerraceModel | null = null;


  onSelectTerraceType() {
    if (this.selectedTerraceType) {
      this.terraceSelected.emit(this.selectedTerraceType);
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
