import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ImportsModule } from '../../../../imports';

import { TerraceModel as RTerraceModel } from '../../../../models/ms_reserve/TerraceModel';
import { EventModel as R_EventModel } from '../../../../models/ms_reserve/EventModel';
import { ReserveModel as R_ReserveModel } from '../../../../models/ms_reserve/ReserveModel';
import { TemplateModel as T_TemplateModel } from '../../../../models/ms_template/template';
import { ServiceModel as R_ServiceModel } from '../../../../models/ms_reserve/ServiceModel';


@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [ImportsModule, CommonModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {
  
}
