import { Injectable } from '@angular/core';
import { loadScript } from '@paypal/paypal-js';

// Configuración de PayPal
const PAYPAL_CONFIG = {
  clientId: 'ASQ5OZHDxnHfWvZgA7gKEZAWxuSITNvnvU0Rnvyo2uhCLWuhCK9dXCyuXxx_zjAvY0f14t2rNnkScvfH',
  currency: 'MXN',
  intent: 'capture',
  
  merchantId: 'sb-bhls148375395@business.example.com' 
};

@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  private paypalInstance: any = null;

  constructor() {}

  /**
   * Inicializar PayPal SDK
   */
  async initPayPal(): Promise<void> {
    try {
      if (!this.paypalInstance) {
        this.paypalInstance = await loadScript({
          clientId: PAYPAL_CONFIG.clientId,
          currency: PAYPAL_CONFIG.currency,
          intent: PAYPAL_CONFIG.intent
        });
      }
    } catch (error) {
      console.error('Error loading PayPal SDK:', error);
      throw error;
    }
  }

  /**
   * Crear orden de pago
   */
  createOrder(totalAmount: number, description: string): any {
    return {
      purchase_units: [{
        amount: {
          value: totalAmount.toString(),
          currency_code: PAYPAL_CONFIG.currency
        },
        description: description,
        
        payee: {
          email_address: PAYPAL_CONFIG.merchantId
        }
      }]
    };
  }

  /**
   * Renderizar botones de PayPal
   */
  async renderButtons(
    containerId: string,
    amount: number,
    description: string,
    onApprove: (data: any, actions: any) => void,
    onError: (error: any) => void
  ): Promise<void> {
    try {
      await this.initPayPal();

      if (!this.paypalInstance || !this.paypalInstance.Buttons) {
        throw new Error('PayPal SDK not loaded');
      }

      // Renderizar botones
      this.paypalInstance.Buttons({
        
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal'
        },

        // Crear orden
        createOrder: (data: any, actions: any) => {
          return actions.order.create(this.createOrder(amount, description));
        },

        // Aprobar pago
        onApprove: onApprove,

        // Error
        onError: onError,

        // Cancelar
        onCancel: (data: any) => {
          console.log('Payment cancelled:', data);
        }
      }).render(`#${containerId}`);

    } catch (error) {
      console.error('Error rendering PayPal buttons:', error);
      throw error;
    }
  }

  /**
   * Verificar si PayPal está cargado
   */
  isLoaded(): boolean {
    return this.paypalInstance !== null;
  }
}