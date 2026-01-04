import { Component, OnInit, signal, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ImportsModule } from '../../../../imports';
import { MessageService } from 'primeng/api';

import { EventModel as R_EventModel } from '../../../../models/ms_reserve/EventModel';
import { ReserveModel as R_ReserveModel } from '../../../../models/ms_reserve/ReserveModel';
import { ServiceModel as R_ServiceModel } from '../../../../models/ms_reserve/ServiceModel';

import { EventService as R_EventService } from '../../../../shared/ms_reserve/eventService.service';
import { PaypalService } from '../../../../shared/payment/paypal.service';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [ImportsModule, CommonModule, FormsModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css',
  providers: [MessageService]
})
export class ConfirmationComponent implements OnInit, AfterViewInit, OnDestroy {

  eventForm = {
    sizePeople: 50,
    dayDate: new Date(),
    eventType: '',
    additionalNotes: '',
    payment: 'paypal' as string
  };

  eventModel = signal<Partial<R_EventModel>>({});
  reserveModels = signal<Partial<R_ReserveModel>[]>([]);

  // PayPal
  showPayPalDialog = false;
  paypalLoading = false;
  paymentCompleted = false;
  paymentDetails: any = null;

  timeOptions = ['2 horas', '4 horas', '6 horas', '8 horas', 'Todo el día'];
  paymentOptions = [
    { label: 'PayPal', value: 'paypal' },
    { label: 'Pendiente', value: 'pending' }
  ];

  constructor(
    private router: Router,
    private messageService: MessageService,
    private eventService: R_EventService,
    private paypalService: PaypalService
  ) {}

  ngOnInit(): void {
    this.loadReservationData();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
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
    return terrace.priceAdd10;
  }

  calculateServicesTotal(): number {
    return this.reserveModels().reduce((total, reserve) => total + (reserve.finalPrice || 0), 0);
  }

  calculateEventTotal(): number {
    return this.calculateTerracePrice() + this.calculateServicesTotal();
  }

  updateReservePeople(reserve: Partial<R_ReserveModel>, peopleCount: string | number | null): void {
    if (!reserve.serviceModel) return;

    const count = peopleCount === null || peopleCount === '' 
      ? reserve.serviceModel.baseSize 
      : Number(peopleCount) || reserve.serviceModel.baseSize;

    const service = reserve.serviceModel;
    const validPeople = Math.min(Math.max(count, service.baseSize), service.maxSize);
    
    reserve.sizePeople = validPeople;
    reserve.finalPrice = this.calculateServicePrice(service, validPeople);
    
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

  saveReservationData(): void {
    try {
      const reserveData = {
        reserveReserves: this.reserveModels(),
        reserveServices: this.reserveModels().map(reserve => reserve.serviceModel)
      };

      localStorage.setItem('pendingServiceReservations', JSON.stringify(reserveData));

      const updatedEvent = {
        ...this.eventModel(),
        sizePeople: this.eventForm.sizePeople,
        dayDate: this.eventForm.dayDate.toISOString(),
        payment: this.eventForm.payment,
        sumPrice: this.calculateEventTotal()
      };
      
      localStorage.setItem('pendingEventReservation', JSON.stringify(updatedEvent));
    } catch (error) {
      this.handleError('Error guardando datos');
    }
  }

  /**
   *  Abrir modal de PayPal
   */
  openPayPalDialog(): void {
    if (!this.isFormValid()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Formulario incompleto',
        detail: 'Completa todos los campos antes de proceder al pago'
      });
      return;
    }

    this.showPayPalDialog = true;
    this.paypalLoading = true;

    // Renderizar botones de PayPal después de que el dialog se muestre
    setTimeout(() => {
      this.renderPayPalButtons();
    }, 300);
  }

  /**
   *  Renderizar botones de PayPal
   */
  async renderPayPalButtons(): Promise<void> {
    try {
      const totalAmount = this.calculateEventTotal();
      const eventDescription = `EventPlanify - Reserva de evento`;

      await this.paypalService.renderButtons(
        'paypal-button-container',
        totalAmount,
        eventDescription,
        async (data, actions) => {
          // Capturar el pago
          const order = await actions.order.capture();
          this.onPayPalSuccess(order);
        },
        (err) => {
          this.onPayPalError(err);
        }
      );

      this.paypalLoading = false;
    } catch (error) {
      console.error('Error rendering PayPal buttons:', error);
      this.paypalLoading = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudieron cargar los botones de PayPal'
      });
    }
  }

  /**
   *  Manejo de pago exitoso
   */
  onPayPalSuccess(order: any): void {
    console.log('Pago completado:', order);
    
    this.paymentCompleted = true;
    this.paymentDetails = order;
    this.eventForm.payment = 'paid';

    this.messageService.add({
      severity: 'success',
      summary: 'Pago Exitoso',
      detail: `Pago procesado correctamente. ID: ${order.id}`,
      life: 5000
    });

    // Guardar la reserva con el pago confirmado
    this.confirmReservationAfterPayment(order);
  }

  /**
   *  Manejo de error en el pago
   */
  onPayPalError(error: any): void {
    console.error('Error en el pago de PayPal:', error);
    
    this.messageService.add({
      severity: 'error',
      summary: 'Error en el Pago',
      detail: 'Hubo un problema al procesar el pago. Intenta nuevamente.',
      life: 5000
    });
  }

  /**
   * Confirmar reserva después del pago
   */
  confirmReservationAfterPayment(paypalOrder: any): void {
    const confirmedReservation = {
      event: {
        ...this.eventModel(),
        sizePeople: this.eventForm.sizePeople,
        dayDate: this.eventForm.dayDate.toISOString(),
        payment: 'paid',
        sumPrice: this.calculateEventTotal(),
        paypalOrderId: paypalOrder.id,
        paypalPayerId: paypalOrder.payer.payer_id
      },
      reserves: this.reserveModels(),
      additionalNotes: this.eventForm.additionalNotes,
      confirmedAt: new Date().toISOString(),
      total: this.calculateEventTotal(),
      paymentDetails: paypalOrder
    };

    localStorage.setItem('confirmedReservation', JSON.stringify(confirmedReservation));

    const updatedEvent: R_EventModel = {} as R_EventModel;
    Object.assign(updatedEvent, this.eventModel(), {
      sizePeople: this.eventForm.sizePeople,
      dayDate: this.eventForm.dayDate.toISOString(),
      payment: 'paid',
      sumPrice: this.calculateEventTotal()
    });

    this.eventService.create(updatedEvent as R_EventModel).subscribe({
      next: (savedEvent) => {
        console.log('Evento guardado en backend:', savedEvent);
        
        setTimeout(() => {
          this.showPayPalDialog = false;
          this.router.navigate(['/mis-eventos']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error guardando evento:', err);
        localStorage.setItem('pendingEventReservation', JSON.stringify(updatedEvent));

        setTimeout(() => {
          this.showPayPalDialog = false;
          this.router.navigate(['/mis-eventos']);
        }, 2000);
      }
    });
  }

  /**
   * Cerrar modal de PayPal
   */
  closePayPalDialog(): void {
    this.showPayPalDialog = false;
    this.paypalLoading = false;
  }

  confirmReservation(): void {
    if (this.eventForm.payment === 'paypal') {
      this.openPayPalDialog();
    } else {
      // Método anterior para pagos pendientes
      this.confirmReservationWithoutPayment();
    }
  }

  /**
   * Confirmación sin pago (pendiente)
   */
  confirmReservationWithoutPayment(): void {
    if (!this.isFormValid()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Formulario incompleto',
        detail: 'Completa todos los campos requeridos'
      });
      return;
    }

    this.saveReservationData();

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