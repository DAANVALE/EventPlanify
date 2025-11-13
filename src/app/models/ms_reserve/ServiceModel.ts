import { AsociateServiceModel } from './AsociateServiceModel';

export interface ServiceModel{
  id: number;
  name: string;

  asociateServiceModel: AsociateServiceModel;

  basePrice: number;
  priceAdd10: number;

  baseSize: number;
  maxSize: number;

  killed: number;
}
