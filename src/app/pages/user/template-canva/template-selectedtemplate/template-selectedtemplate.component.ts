import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ImportsModule } from '../../../../imports';
import { CommonModule } from '@angular/common';

import { EventModel } from '../../../../models/ms_reserve/EventModel';
import { TerraceModel as RTerraceModel } from '../../../../models/ms_reserve/TerraceModel';
import { TerraceModel as TTerraceModel } from '../../../../models/ms_template/terrace';

@Component({
  selector: 'app-template-selectedtemplate',
  standalone: true,
  imports: [ImportsModule, CommonModule, ImportsModule],
  templateUrl: './template-selectedtemplate.component.html',
  styleUrl: './template-selectedtemplate.component.css'
})
export class TemplateSelectedTemplateComponent implements OnInit {

  eventModel: Partial<EventModel> = {};
  
  terraceModelReserve: RTerraceModel | null = null;
  terraceModelTemplate: TTerraceModel | null = null;

  constructor() { }

  ngOnInit(): void {
    this.loadEventFromLocal();
  }

  loadEventFromLocal(): void{
    const data = localStorage.getItem('event');
    if(data){
      this.eventModel = JSON.parse(data);
      this.terraceModelReserve = this.eventModel.terraceModel!;
    }
  }

  clear(): void{
    localStorage.setItem('event', String());
    this.eventModel.terraceModel = undefined;
    this.saveEventModelToLocal();
  }

  saveEventModelToLocal(): void{
    localStorage.setItem('event', JSON.stringify(this.eventModel));
  }
}
