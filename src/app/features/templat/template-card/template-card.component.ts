import { TemplateService } from './../../../shared/ms_template/templateService.service';
import { CommonModule } from '@angular/common';
import { Component, Input, signal, OnInit, effect, SimpleChanges } from '@angular/core';
import { TemplateModel } from '../../../models/ms_template/template';
import { ImportsModule } from '../../../imports';
import { Router } from '@angular/router';

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

  constructor(private templateService: TemplateService, private router: Router){
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
    this.router.navigate(['/template'], {
      state: { template: template }
    });
  }

  getTemplateIcon(kind: string): string {
    const icons: { [key: string]: string } = {
      // Eventos Familiares y Personales
      'Boda': 'pi-heart',
      'XV Años': 'pi-crown',
      'Cumpleaños': 'pi-birthday-cake',
      'Bautizo': 'pi-water',
      'Primera Comunión': 'pi-book',
      'Despedida de Soltero(a)': 'pi-martini',
      'Aniversario': 'pi-gift',
      'Graduación': 'pi-graduation-cap',
      'Reunión Familiar': 'pi-home',
      'Carne Asada': 'pi-fire',
      
      // Eventos Empresariales
      'Evento Empresarial': 'pi-briefcase',
      'Conferencia': 'pi-users',
      'Presentación de Producto': 'pi-megaphone',
      'Reunión de Negocios': 'pi-chart-line',
      'Networking': 'pi-comments',
      
      // Eventos Sociales y Especiales
      'Fiesta Infantil': 'pi-palette',
      'Festival': 'pi-sun',
      'Concierto': 'pi-music',
      'Picnic o Outdoor': 'pi-tree',
      'Baby Shower': 'pi-baby-carriage',
      'Gender Reveal': 'pi-question-circle',
      'Cena Romántica': 'pi-moon',
      'Posada o Fiesta Navideña': 'pi-star',
      'Evento Deportivo': 'pi-trophy',
      'Recaudación o Beneficencia': 'pi-heart',
      'Fiesta Temática': 'pi-mask',
      'After Party': 'pi-clock',
      'Desfile o Exhibición': 'pi-eye',
      'Workshop o Taller': 'pi-wrench',
      
      // Por defecto
      'Otro': 'pi-flag'
    };
    
    return icons[kind] || 'pi-flag';
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
