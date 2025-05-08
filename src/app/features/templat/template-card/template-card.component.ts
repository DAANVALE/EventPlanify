import { TemplateService } from './../../../shared/ms_template/templateService.service';
import { CommonModule } from '@angular/common';
import { Component, Input, signal, OnInit, effect, SimpleChanges } from '@angular/core';
import { TemplateModel } from '../../../models/ms_template/template';
import { ImportsModule } from '../../../imports';

@Component({
  selector: 'app-template-card',
  standalone: true,
  imports: [CommonModule, ImportsModule],
  templateUrl: './template-card.component.html',
  styleUrl: './template-card.component.css'
})
export class TemplateCardComponent implements OnInit  {
  @Input({ required: true }) eventTypeId!: number;

  templates = signal<TemplateModel[]>([]);

  constructor(private templateService: TemplateService){
  }

  ngOnInit(): void{
    this.loadTemplates();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventTypeId'] && !changes['eventTypeId'].firstChange) {
      this.loadTemplates();
    }
  }

  loadTemplates(): void{
    this.templateService.getAll().subscribe({
      next: (data) => this.templates.set(data),
      error: (error) => console.error("Error", error),
    })
  }

  onSelectTemplate(template: TemplateModel): void {
    console.log('Seleccionado:', template);
    // Aquí puedes emitir un evento o cambiar un signal
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
