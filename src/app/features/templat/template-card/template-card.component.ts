import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-template-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './template-card.component.html',
  styleUrl: './template-card.component.css'
})
export class TemplateCardComponent {
  @Input({ required: true }) eventTypeId!: number;
}
