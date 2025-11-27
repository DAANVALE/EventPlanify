import { EventTypeService } from './../../../shared/ms_template/eventTypeService.service';
import { Component, OnInit, SimpleChanges, signal } from '@angular/core';

import { TemplateCardComponent } from '../../templat/template-card/template-card.component';

import { CommonModule } from '@angular/common';
import { ImportsModule } from '../../../imports';

import { EventTypeModel } from '../../../models/ms_template/event-type';

@Component({
  selector: 'app-type-event-menu',
  standalone: true,
  imports: [CommonModule, ImportsModule, TemplateCardComponent],
  templateUrl: './type-event-menu.component.html',
  styleUrls: ['./type-event-menu.component.css']
})
export class TypeEventMenuComponent implements OnInit{

  eventTypes: EventTypeModel[] = [];
  eventTypeSelected = signal<EventTypeModel | null>(null);

  constructor(private eventTypeService: EventTypeService){

  }

  ngOnInit(): void {
      this.loadEventTypes();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['eventTypeId']) {
      this.loadEventTypes();
    }
  }


  loadEventTypes(): void{
    this.eventTypeService.getAll().subscribe({
    next: (data) => this.eventTypes = data,
    error: (error) => console.error("Error", error),
    });
  }

  onSelectEventType(eventType: EventTypeModel): void {
    if (this.eventTypeSelected() === eventType) {
      this.eventTypeSelected.set(null); // Deseleccionar
    } else {
      this.eventTypeSelected.set(eventType); // Seleccionar
    }
  }

  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 8,
      numScroll: 1
    },
    {
      breakpoint: '1100px',
      numVisible: 5,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '480px',
      numVisible: 2,
      numScroll: 1
    }
  ];
}
