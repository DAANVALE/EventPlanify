import { AsociateService } from './AsociateServiceModel';

export interface ServiceModel{
  id: number;
  name: string;

  asociateService: AsociateService;

  basePrice: number;
  priceAdd10: number;

  baseSize: number;
  maxSize: number;

  killed: number;
}
