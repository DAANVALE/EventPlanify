import { Component } from '@angular/core';
import { ImportsModule } from '../../../../imports';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template-selectedtemplate',
  standalone: true,
  imports: [ImportsModule, CommonModule],
  templateUrl: './template-selectedtemplate.component.html',
  styleUrl: './template-selectedtemplate.component.css'
})
export class TemplateSelectedtemplateComponent {

}
