import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ImportsModule } from '../../../../imports';
import { MessageService } from 'primeng/api';

import { EventModel as R_EventModel } from '../../../../models/ms_reserve/EventModel';
import { ReserveModel as R_ReserveModel } from '../../../../models/ms_reserve/ReserveModel';
import { ServiceModel as R_ServiceModel } from '../../../../models/ms_reserve/ServiceModel';
import { TerraceModel as R_TerraceModel } from '../../../../models/ms_reserve/TerraceModel';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [ImportsModule, CommonModule, FormsModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css',
  providers: [MessageService] 
})
export class ConfirmationComponent implements OnInit {

  eventForm = {
    sizePeople: 50,
    dayDate: new Date(),
    eventType: '',
    additionalNotes: '',
    payment: 'pending' as string
  };

  eventModel = signal<Partial<R_EventModel>>({});
  reserveModels = signal<Partial<R_ReserveModel>[]>([]);

  // Opciones para dropdowns
  timeOptions = ['2 horas', '4 horas', '6 horas', '8 horas', 'Todo el día'];
  paymentOptions = [
    { label: 'Pendiente', value: 'pending' },
    { label: 'Depósito', value: 'deposit' },
    { label: 'Pagado', value: 'paid' }
  ];

  constructor(
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadReservationData();
  }

  private loadReservationData(): void {
    try {
      this.loadEventData();
      this.loadServiceReserves();
    } catch (error) {
      this.handleError('Error cargando datos de reserva');
    }
  }

  private loadEventData(): void {
    const eventData = localStorage.getItem('pendingEventReservation');
    if (!eventData) return;

    const parsed = JSON.parse(eventData);
    this.eventModel.set(parsed);
    
    if (parsed.terraceModel) {
      this.eventForm.sizePeople = parsed.sizePeople || parsed.terraceModel.baseSize || 50;
    }
    if (parsed.dayDate) {
      this.eventForm.dayDate = new Date(parsed.dayDate);
    }
    if (parsed.payment) {
      this.eventForm.payment = parsed.payment;
    }
  }

  private loadServiceReserves(): void {
    const serviceReserves = localStorage.getItem('pendingServiceReservations');
    if (!serviceReserves || serviceReserves === 'undefined' || serviceReserves === '[]') {
      this.reserveModels.set([]);
      return;
    }

    const parsed = JSON.parse(serviceReserves);
    let reserves: Partial<R_ReserveModel>[] = [];

    if (parsed.reserveReserves && Array.isArray(parsed.reserveReserves)) {
      reserves = parsed.reserveReserves.map((item: any) => {
        // Desanidar serviceModel si es necesario
        const serviceModel = item.serviceModel?.serviceModel || item.serviceModel || item;
        const sizePeople = item.sizePeople || serviceModel?.baseSize || 1;
        const finalPrice = item.finalPrice || this.calculateServicePrice(serviceModel, sizePeople);

        return {
          serviceModel: serviceModel,
          sizePeople: sizePeople,
          finalPrice: finalPrice,
          dayTime: item.dayTime || '2 horas'
        };
      });
    }

    this.reserveModels.set(reserves);
  }

  // CÁLCULOS DE PRECIOS
  calculateServicePrice(service: R_ServiceModel, peopleCount: number): number {
    if (!service) return 0;
    const basePrice = service.basePrice || 0;
    const additionalPeople = Math.max(0, peopleCount - service.baseSize);
    const extraCharges = Math.ceil(additionalPeople / 10) * service.priceAdd10;
    return basePrice + extraCharges;
  }

  calculateTerracePrice(): number {
    const terrace = this.eventModel().terraceModel;
    if (!terrace) return 0;
    return terrace.priceAdd10; // Precio base de la terraza
  }

  calculateServicesTotal(): number {
    return this.reserveModels().reduce((total, reserve) => total + (reserve.finalPrice || 0), 0);
  }

  calculateEventTotal(): number {
    return this.calculateTerracePrice() + this.calculateServicesTotal();
  }

  // ACTUALIZAR RESERVAS (SERVICIOS)
  updateReservePeople(reserve: Partial<R_ReserveModel>, peopleCount: string | number | null): void {
    if (!reserve.serviceModel) return;

    const count = peopleCount === null || peopleCount === '' 
      ? reserve.serviceModel.baseSize 
      : Number(peopleCount) || reserve.serviceModel.baseSize;

    const service = reserve.serviceModel;
    const validPeople = Math.min(Math.max(count, service.baseSize), service.maxSize);
    
    // Actualizar el objeto reserve directamente
    reserve.sizePeople = validPeople;
    reserve.finalPrice = this.calculateServicePrice(service, validPeople);
    
    // Forzar actualización de la señal
    this.reserveModels.update(reserves => [...reserves]);
    this.saveReservationData();
  }

  updateReserveTime(reserve: Partial<R_ReserveModel>, time: string): void {
    reserve.dayTime = time;
    this.reserveModels.update(reserves => [...reserves]);
    this.saveReservationData();
  }

  removeReserve(reserve: Partial<R_ReserveModel>): void {
    const updatedReserves = this.reserveModels().filter(r => r !== reserve);
    this.reserveModels.set(updatedReserves);
    this.saveReservationData();
    
    this.messageService.add({
      severity: 'success',
      summary: 'Servicio eliminado',
      detail: `${reserve.serviceModel?.name} fue removido`
    });
  }

  // ACTUALIZAR EVENTO
  updateEventPeople(): void {
    const terrace = this.eventModel().terraceModel;
    if (terrace && this.eventForm.sizePeople > terrace.maxSize) {
      this.eventForm.sizePeople = terrace.maxSize;
      this.messageService.add({
        severity: 'warn',
        summary: 'Capacidad máxima',
        detail: `Máximo ${terrace.maxSize} personas`
      });
    }
    this.saveReservationData();
  }

  // GUARDAR DATOS
  saveReservationData(): void {
    try {
      // Guardar reservas completas
      const reserveData = {
        reserveReserves: this.reserveModels(),
        reserveServices: this.reserveModels().map(reserve => reserve.serviceModel)
      };
      
      localStorage.setItem('pendingServiceReservations', JSON.stringify(reserveData));
      
      // Guardar evento actualizado
      const updatedEvent = {
        ...this.eventModel(),
        sizePeople: this.eventForm.sizePeople,
        dayDate: this.eventForm.dayDate.toISOString(),
        payment: this.eventForm.payment,
        additionalNotes: this.eventForm.additionalNotes,
        sumPrice: this.calculateEventTotal()
      };
      
      localStorage.setItem('pendingEventReservation', JSON.stringify(updatedEvent));
    } catch (error) {
      this.handleError('Error guardando datos');
    }
  }

  // CONFIRMAR RESERVA
  confirmReservation(): void {
    if (!this.isFormValid()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Formulario incompleto',
        detail: 'Completa todos los campos requeridos'
      });
      return;
    }

    const confirmedReservation = {
      event: {
        ...this.eventModel(),
        sizePeople: this.eventForm.sizePeople,
        dayDate: this.eventForm.dayDate.toISOString(),
        payment: this.eventForm.payment,
        sumPrice: this.calculateEventTotal()
      },
      reserves: this.reserveModels(),
      additionalNotes: this.eventForm.additionalNotes,
      confirmedAt: new Date().toISOString(),
      total: this.calculateEventTotal()
    };

    localStorage.setItem('confirmedReservation', JSON.stringify(confirmedReservation));
    
    this.messageService.add({
      severity: 'success',
      summary: '¡Reserva Confirmada!',
      detail: `Total: $${this.calculateEventTotal()}`,
      life: 5000
    });

    setTimeout(() => this.router.navigate(['/']), 3000);
  }

  isFormValid(): boolean {
    return this.eventForm.sizePeople > 0 && 
           this.eventForm.dayDate !== null && 
           this.eventForm.payment !== '';
  }

  // HELPERS
  getTerraceCapacity(): string {
    const terrace = this.eventModel().terraceModel;
    return terrace ? `${terrace.baseSize} - ${terrace.maxSize} personas` : 'No disponible';
  }

  getExtraPeopleCount(): number {
    const terrace = this.eventModel().terraceModel;
    return terrace ? Math.max(0, this.eventForm.sizePeople - terrace.baseSize) : 0;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  private handleError(message: string): void {
    console.error(message);
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    });
  }
}