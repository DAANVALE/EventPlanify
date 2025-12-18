import { Component } from '@angular/core';
import { AsociateServiceService } from '../../shared/ms_reserve/asociateServiceService.service';
import { AsociateService } from '../../models/ms_reserve/AsociateServiceModel';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-testing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.css'
})
export class TestingComponent {

  asociateServiceModels : AsociateService[] = [];

  constructor(private asociateServiceService : AsociateServiceService) { 
  }

  ngOnInit(): void {
    this.loadAsociateServices();
  }

  loadAsociateServices(): void {
    this.asociateServiceService.getAll().subscribe({
      next: (data) => {
        this.asociateServiceModels = data;
        console.log('Asociate Services loaded: ', data);
      },
      error: (error) => {
        console.error('Error loading Asociate Services:', error);
      }
    });
  }
}
