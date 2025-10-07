import { StateReserveType } from './StateReserveType';
import { ServiceModel } from './../ms_reserve/ServiceModel';
import { EventModel } from "./EventModel";

export interface ReserveModel{
  id: number;

  eventModel: EventModel;
  serviceModel: ServiceModel;
  stateReserveType: StateReserveType;

  // add in microservices to save dynamic
  sizePeople: number;
  finalPrice: number;

  dayTime: string;
}


