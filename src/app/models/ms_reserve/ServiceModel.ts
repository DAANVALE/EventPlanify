import { AsociateServiceModel } from './AsociateServiceModel';

export interface ServiceModel{
  id: number;
  name: string;

  asociateTerraceMode: AsociateServiceModel;

  baseSize: number;
  maxSize: number;
  priceAdd10: number;

  direction: string;
  killed: boolean;
}
