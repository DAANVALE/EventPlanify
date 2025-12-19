import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';

import { AsociateTerrace } from '../../models/ms_reserve/AsociateTerraceModel';
import { AsociateService } from '../../models/ms_reserve/AsociateServiceModel';
import { ClientModel } from '../../models/ms_reserve/ClientModel';

import { AsociateServiceService } from '../../shared/ms_reserve/asociateServiceService.service';
import { AsociateTerraceService } from '../../shared/ms_reserve/asociateTerraceService.service';
import { ClientService } from '../../shared/ms_reserve/clientService.service';

@Component({
  selector: 'app-testing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.css'
})
export class TestingComponent {

  asociateServiceModels : AsociateService[] = [];
  asociateTerraceModels : AsociateTerrace[] = [];
  clientModels : ClientModel[] = [];
  
  constructor(
    private asociateServiceService : AsociateServiceService,
    private asociateTerraceService : AsociateTerraceService,
    private clientService: ClientService
  ) { 
  }

  ngOnInit(): void {
    this.loadAsociateServices();
    this.loadAsociateTerraces();
    this.loadClients();
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

  loadAsociateTerraces(): void {
    this.asociateTerraceService.getAll().subscribe({
      next: (data) => {
        this.asociateTerraceModels = data;
        console.log('Asociate Terraces loaded: ', data);
      },
      error: (error) => {
        console.error('Error loading Asociate Terraces:', error);
      }
    });
  }

    loadClients(): void {
    this.clientService.getAll().subscribe({
      next: (data) => {
        this.clientModels = data;
        console.log('Clients loaded: ', data);
      },
      error: (error) => {
        console.error('Error loading Clients :', error);
      }
    });
  }
}
